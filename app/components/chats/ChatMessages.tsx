"use client";

import Tooltip from "@mui/material/Tooltip";
import { Message, User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ChatMessagesProps {
  currentUser: User;
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  currentUser,
}) => {
  const router = useRouter();

  setTimeout(() => router.refresh(), 5000);

  return (
    <div className='flex flex-col gap-2 py-2 flex-1 justify-end overflow-auto my-2'>
      {messages.map((item) => (
        <Tooltip
          title={item.createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          placement={`${item.senderId === currentUser.id ? "left" : "right"}`}
          key={item.id}
        >
          <div
            className={`${
              item.senderId === currentUser.id
                ? "bg-orange-500 self-end mr-2"
                : "bg-gray-300 self-start"
            } rounded-xl px-2 py-1 text-white text-lg max-w-2xl`}
          >
            {item.body}
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default ChatMessages;
