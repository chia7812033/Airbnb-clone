import Chats from "./Chats";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";

export const metadata = {
  title: "My Chat",
};

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState />;
  }

  return <Chats />;
};

export default page;
