import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/utils/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reservations);
  } catch (error: any) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { startDate, endDate, totalPrice, listingId, guestCount } = body;

  if (!startDate || !endDate || !totalPrice || !listingId || !guestCount) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
          guestCount,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
