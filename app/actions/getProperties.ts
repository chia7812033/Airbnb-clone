import prisma from "@/app/libs/prismadb";

export default async function getProperties(id: string) {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: id,
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
