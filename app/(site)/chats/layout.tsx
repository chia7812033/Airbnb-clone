import ChatList from "@/app/components/chats/ChatList";
import Container from "@/app/components/ui/Container";
import EmptyState from "@/app/components/ui/EmptyState";
import getChats from "@/app/utils/getChats";
import getCurrentUser from "@/app/utils/getCurrentUser";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState />;
  }
  const chats = await getChats();

  return (
    <Container>
      <div className='flex flex-row'>
        <div className='h-full hidden md:block md:w-1/3 bg-gray-50'>
          <ChatList chats={chats} currentUser={currentUser} />
        </div>
        <div className='pt-28'>{children}</div>
      </div>
    </Container>
  );
}
