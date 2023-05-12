import getSession from "./getSession";
import prisma from "@/app/libs/prismadb";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    const SafeUsers = users.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      emailVerified: item.emailVerified?.toISOString() || null,
    }));

    return SafeUsers;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
