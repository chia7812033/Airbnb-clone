import { SafeRating } from "../types";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

export default async function getReservations(listingId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }

  try {
    const rating = await prisma.rating.findFirst({
      where: {
        listingId,
        userId: currentUser.id,
      },
    });

    if (!rating) {
      return;
    }

    const SafeRating: SafeRating = {
      ...rating,
      createdAt: rating?.createdAt.toISOString(),
    };

    return SafeRating;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
