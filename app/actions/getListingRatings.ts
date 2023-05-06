import prisma from "@/app/libs/prismadb";

export default async function getReservations(listingId: string) {
  try {
    const avgRating = await prisma.rating.aggregate({
      where: {
        listingId,
      },
      _avg: {
        rating: true,
      },
    });

    if (!avgRating._avg.rating) {
      return;
    }

    return avgRating._avg.rating;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
