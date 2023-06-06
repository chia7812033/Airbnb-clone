import CustomAvatar from "../ui/CustomAvatar";
import ChatOptions from "./ChatOptions";
import { User } from "@prisma/client";

interface ChatHeadingProps {
  currentUser: User;
}

const ChatHeading: React.FC<ChatHeadingProps> = ({ currentUser }) => {
  return (
    <div className='flex flex-row justify-between w-full border-b-2 pb-1'>
      <div className='flex flex-row gap-2'>
        <CustomAvatar currentUser={currentUser} />
        <div className='text-xl'>{currentUser.name}</div>
      </div>
      <ChatOptions />
    </div>
  );
};

export default ChatHeading;
