import Chats from "./Chats";
import getChats from "@/app/utils/getChats";

export const metadata = {
  title: "My Chat",
};

const page = async () => {
  const chats = await getChats();

  return <Chats chats={chats} />;
};

export default page;
