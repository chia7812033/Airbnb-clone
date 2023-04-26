import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

export default async function getFavorites() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Not authenticated");
  }

  try {
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
