import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import EmptyState from "../components/EmptyState";
import Favorites from "./Favorites";

export const metadata = {
  title: "My Favorites",
};

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title={"Not logged in"} subtitle={"Please login first"} />
    );
  }

  const favorites = await getFavorites();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title={"No favorites place found"}
        subtitle={"Add some place to favorites first!"}
      />
    );
  }

  return <Favorites favorites={favorites} currentUser={currentUser} />;
};

export default FavoritesPage;
