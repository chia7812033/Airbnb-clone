"use client";

import CustomAvatar from "../ui/CustomAvatar";
import { ChatType } from "@/app/types";
import { User } from "@prisma/client";

interface ChatCardProps {
  chat: ChatType;
  currentUser: User;
}

const ChatCard: React.FC<ChatCardProps> = ({ chat, currentUser }) => {
  const other = chat.users.filter((item) => item.id != currentUser.id)[0];

  return (
    <div className='flex flex-row gap-2 items-center px-4 py-2'>
      <div>
        <CustomAvatar currentUser={other} />
      </div>
      <div className='flex flex-row flex-1 justify-between'>
        <div>
          <div className='font-semibold'>{other.name}</div>
          <div className='text-sm'>
            {chat.messages[0]?.body || "Last Message"}
          </div>
        </div>
        <div className='text-xs'>{chat.lastMessageAt.toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default ChatCard;
