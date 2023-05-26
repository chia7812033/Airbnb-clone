import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/utils/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { rating, listingId } = body;
  if (!rating) {
    return NextResponse.error();
  }

  if (rating < 0 || rating > 5) {
    return NextResponse.error();
  }

  const currentRating = await prisma.rating.findFirst({
    where: {
      userId: currentUser.id,
      listingId,
    },
  });

  let newRating;

  if (currentRating) {
    newRating = await prisma.rating.update({
      where: {
        id: currentRating.id,
      },
      data: {
        rating: rating,
      },
    });
  } else {
    newRating = await prisma.rating.create({
      data: {
        rating,
        userId: currentUser.id,
        listingId,
      },
    });
  }

  return NextResponse.json(newRating);
}
