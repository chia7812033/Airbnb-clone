import Chats from "./Chats";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";

export const metadata = {
  title: "My Chat",
};

const page = async () => {
  return <Chats />;
};

export default page;
