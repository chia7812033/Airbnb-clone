import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  reservationId?: string;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
      throw new Error("Invalid reservationId");
    }

    const reservation = await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status: "Cancel",
      },
    });

    if (!reservation) {
      return NextResponse.error();
    }
    console.log(reservation);

    return NextResponse.json(reservation);
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
