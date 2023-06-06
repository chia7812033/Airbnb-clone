import EmptyState from "@/app/components/ui/EmptyState";
import { ChatType } from "@/app/types";
import { redirect } from "next/navigation";

interface ChatsProps {
  chats: ChatType[];
}

const Chats: React.FC<ChatsProps> = ({ chats }) => {
  if (chats.length === 0) {
    return (
      <div>
        <EmptyState title='No Chat Found' />
      </div>
    );
  } else {
    redirect(`chats/${chats[0].id}`);
  }
};

export default Chats;
