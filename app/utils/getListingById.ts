import prisma from "@/app/libs/prismadb";

export default async function getListingById(id: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return listing;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
