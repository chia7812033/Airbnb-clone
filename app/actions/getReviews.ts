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

    const SafeReviews = reviews.map((item: any) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      user: {
        ...item.user,
        createdAt: item.user.createdAt.toISOString(),
        updatedAt: item.user.updatedAt.toISOString(),
        emailVerified: item.user.emailVerified?.toISOString(),
      },
    }));

    return SafeReviews;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
