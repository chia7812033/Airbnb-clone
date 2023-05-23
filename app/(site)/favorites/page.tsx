import Favorites from "./Favorites";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavorites from "@/app/actions/getFavorites";
import EmptyState from "@/app/components/ui/EmptyState";

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
