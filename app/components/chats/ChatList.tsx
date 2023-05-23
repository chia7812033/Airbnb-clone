"use client";

import Heading from "../ui/Heading";
import ChatCard from "./ChatCard";
import { ChatType } from "@/app/types";
import { User } from "@prisma/client";
import React from "react";

interface ChatListProps {
  chats: ChatType[];
  currentUser: User;
}

const ChatList: React.FC<ChatListProps> = ({ chats, currentUser }) => {
  console.log(chats);
  return (
    <div className='bg-gray-50'>
      <Heading title='Messages' />
      <div>
        {chats.map((item) => (
          <ChatCard key={item.id} chat={item} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
