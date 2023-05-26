import prisma from "@/app/libs/prismadb";

export default async function getReservations(listingId: string) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        listingId: listingId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reviews;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
