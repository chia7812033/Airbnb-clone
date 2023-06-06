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
      <div className='flex flex-row h-full'>
        <div className='h-full hidden md:block md:w-1/3 lg:w-1/4'>
          <ChatList chats={chats} currentUser={currentUser} />
        </div>
        <div className='w-full'>{children}</div>
      </div>
    </Container>
  );
}
