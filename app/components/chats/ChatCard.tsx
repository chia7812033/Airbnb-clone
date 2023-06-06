"use client";

import CustomAvatar from "../ui/CustomAvatar";
import { ChatType } from "@/app/types";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface ChatCardProps {
  chat: ChatType;
  currentUser: User;
}

const ChatCard: React.FC<ChatCardProps> = ({ chat, currentUser }) => {
  const other = chat.users.filter((item) => item.id != currentUser.id)[0];
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/chats/${chat.id}`)}
      className='flex flex-row gap-2 items-center pr-4 py-2 cursor-pointer hover:bg-slate-200 transition rounded-lg w-full'
    >
      <div>
        <CustomAvatar currentUser={other} profile />
      </div>
      <div className='flex flex-row justify-between overflow-hidden'>
        <div className=''>
          <div className='font-semibold'>{other.name}</div>
          <span className='text-sm'>
            {chat.messages[chat.messages.length - 1]?.body ||
              "Start a new chat"}
          </span>
        </div>
        <div className='text-xs font-light'>
          {format(new Date(chat.lastMessageAt), "p")}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
