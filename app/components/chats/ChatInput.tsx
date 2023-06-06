"use client";

import ChatInputOptions from "./ChatInputOptions";
import { Input } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdSend } from "react-icons/md";

interface ChatInputProps {
  chatId: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);

    if (!message) {
      setIsLoading(false);
      return;
    }

    axios
      .post("/api/messages", {
        chatId,
        text: message,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {})
      .finally(() => {
        setMessage("");
        setIsLoading(false);
      });
  };

  return (
    <div className='flex flex-row w-full min-h-0 mb-2'>
      <form
        onSubmit={onSubmit}
        className='flex flex-row gap-2 items-center w-full'
      >
        <ChatInputOptions />
        <Input
          fullWidth
          placeholder='Aa'
          disableUnderline
          sx={{ backgroundColor: "#DFE4EA", px: 2, py: 1, borderRadius: 8 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <div
          className='text-orange-500 hover:bg-gray-100 transition rounded-full cursor-pointer p-1'
          onClick={isLoading ? () => {} : onSubmit}
        >
          <MdSend size={24} />
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
