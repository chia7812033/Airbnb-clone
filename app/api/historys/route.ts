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

    return NextResponse.json(reservations );
  } catch (error: any) {
    return NextResponse.error();
  }
}
