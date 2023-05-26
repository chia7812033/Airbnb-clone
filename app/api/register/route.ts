import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/utils/getCurrentUser";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { email, name, image } = body;

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const now: Date = new Date();

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      email,
      name,
      image,
      updatedAt: now.toISOString(),
    },
  });

  return NextResponse.json(user);
}
