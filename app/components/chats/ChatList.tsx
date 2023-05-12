import ChatCard from "./ChatCard";
import { ChatType } from "@/app/types";
import { Chat } from "@prisma/client";
import React from "react";

interface ChatListProps {
  chats: ChatType[];
}

const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  return (
    <div className='bg-gray-50'>
      <div>
        {chats.map((item) => (
          <ChatCard key={item.id} chat={item} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
