import Wishlist from "./Wishlist";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";
import getFavorites from "@/app/utils/getFavorites";

export const metadata = {
  title: "My Wishlist",
};

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title={"Not logged in"} />;
  }

  const favorites = await getFavorites();

  if (favorites.length === 0) {
    return <EmptyState title={"No favorites place found"} />;
  }

  return <Wishlist favorites={favorites} currentUser={currentUser} />;
};

export default FavoritesPage;
