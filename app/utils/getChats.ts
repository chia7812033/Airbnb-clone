import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

export default async function getChats() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const chats = await prisma.chat.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
          },
        },
      },
    });

    if (chats.length === 0) {
      return [];
    }

    return chats;
  } catch (error) {
    return [];
  }
}
