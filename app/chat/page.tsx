import getChats from "../actions/getChats";
import ChatList from "../components/chats/ChatList";
import EmptyState from "../components/ui/EmptyState";
import ListingContainer from "../components/ui/ListingContainer";

export const metadata = {
  title: "My Chat",
};

const page = async () => {
  const chats = await getChats();

  return (
    <ListingContainer>
      <div className='hidden lg:block lg:pl-80 col-span-2 bg-gray-50'>
        <ChatList chats={chats} />
      </div>
      <div className='col-span-auto'>
        <EmptyState title='No Chat Found' subtitle='' />
      </div>
    </ListingContainer>
  );
};

export default page;
