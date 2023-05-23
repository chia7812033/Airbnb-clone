import Chats from "./Chats";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/ui/EmptyState";

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
