import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

export default async function getMyProperties() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("No authentication");

  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const SafeListing = listings.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));

    return SafeListing;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
