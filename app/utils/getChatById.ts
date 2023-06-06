import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

export default async function getChatById(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const chat = await prisma.chat.findMany({
      where: {
        id: id,
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return chat;
  } catch (error) {
    return [];
  }
}
