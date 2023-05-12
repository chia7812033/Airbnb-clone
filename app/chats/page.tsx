import getChats from "../actions/getChats";
import getCurrentUser from "../actions/getCurrentUser";
import ChatList from "../components/chats/ChatList";
import EmptyState from "../components/ui/EmptyState";
import ListingContainer from "../components/ui/ListingContainer";
import Chats from "./Chats";

export const metadata = {
  title: "My Chat",
};

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState />;
  }
  const chats = await getChats();

  return <Chats chats={chats} currentUser={currentUser} />;
};

export default page;
