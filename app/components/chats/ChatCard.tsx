import { ChatType } from "@/app/types";
import { Chat } from "@prisma/client";

interface ChatCardProps {
  chat: ChatType;
}

const ChatCard: React.FC<ChatCardProps> = ({ chat }) => {
  return <div>ChatCard</div>;
};

export default ChatCard;
