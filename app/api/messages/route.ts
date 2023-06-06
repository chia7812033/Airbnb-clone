import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/utils/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ text: "apple" });
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { chatId, text } = body;

    const message = await prisma.message.create({
      data: { body: text, chatId, senderId: currentUser.id },
    });

    const now: Date = new Date();
    await prisma.chat.update({
      where: { id: chatId },
      data: {
        lastMessageAt: now.toISOString(),
      },
    });

    return message;
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
