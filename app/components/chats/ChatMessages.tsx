"use client";

import Tooltip from "@mui/material/Tooltip";
import { Message, User } from "@prisma/client";

interface chatMessagesProps {
  currentUser: User;
  messages: Message[];
}

const chatMessages: React.FC<chatMessagesProps> = ({
  messages,
  currentUser,
}) => {
  return (
    <div className='flex flex-col gap-2 py-2 h-full justify-end'>
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
                ? "bg-orange-500 self-end"
                : "bg-gray-200 self-start"
            } rounded-xl px-2 py-1 text-white text-lg max-w-2xl`}
          >
            {item.body}
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default chatMessages;
