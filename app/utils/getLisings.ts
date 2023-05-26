import prisma from "@/app/libs/prismadb";

export default async function getLisings(value: string = "") {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        title: {
          contains: value,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
