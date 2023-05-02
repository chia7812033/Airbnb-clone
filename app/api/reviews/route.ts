import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { listingId, userId, data } = body;

  if (!listingId || !userId || !data) {
    return NextResponse.error();
  }

  const review = await prisma.review.create({
    data: {
      listingId,
      userId,
      comment: data,
    },
  });

  return NextResponse.json(review);
}
