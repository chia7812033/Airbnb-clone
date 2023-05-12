import ChatList from "../components/chats/ChatList";
import Container from "../components/ui/Container";
import EmptyState from "../components/ui/EmptyState";
import { ChatType } from "../types";
import { User } from "@prisma/client";

interface ChatsProps {
  chats: ChatType[];
  currentUser: User;
}

const Chats: React.FC<ChatsProps> = ({ chats, currentUser }) => {
  return (
    <Container>
      <div className='flex flex-row'>
        <div className='h-full hidden md:block md:w-1/3 bg-gray-50'>
          <ChatList chats={chats} currentUser={currentUser} />
        </div>
        <div className=''>
          <EmptyState title='No Chat Found' subtitle='' />
        </div>
      </div>
    </Container>
  );
};

export default Chats;
