import ChatBlock from "@/app/components/chats/ChatBlock";
import EmptyState from "@/app/components/ui/EmptyState";
import getChatById from "@/app/utils/getChatById";
import getCurrentUser from "@/app/utils/getCurrentUser";
import { Metadata } from "next";

interface IParams {
  chatId: string;
}

export async function generateMetadata({
  params,
}: {
  params: IParams;
}): Promise<Metadata> {
  const { chatId } = params;

  return {
    title: `Messenger - ${chatId}` || "Chat not found",
  };
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { chatId } = params;
  const chat = await getChatById(chatId);
  if (!chat[0]) {
    return <EmptyState title='Something went wrong!' />;
  }
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title='Not login' />;
  }

  return (
    <div className='pb-4 w-full h-full'>
      <ChatBlock chat={chat[0]} currentUser={currentUser} />
    </div>
  );
};

export default ListingPage;
