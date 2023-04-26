import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import EmptyState from "../components/EmptyState";
import Favorites from "./Favorites";


const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title={"Not logged in"} subtitle={"Please login first"} />
    );
  }

  const favorites = await getFavorites();

  if (favorites.length === 0) {
    <EmptyState />;
  }
  return <Favorites favorites={favorites} currentUser={currentUser} />;
};

export default FavoritesPage;
