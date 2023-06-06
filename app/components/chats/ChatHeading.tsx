import CustomAvatar from "../ui/CustomAvatar";
import ChatOptions from "./ChatOptions";
import { User } from "@prisma/client";

interface ChatHeadingProps {
  currentUser: User;
}

const ChatHeading: React.FC<ChatHeadingProps> = ({ currentUser }) => {
  return (
    <div className='flex flex-row justify-between w-full border-b-2 pb-1'>
      <div className='flex flex-row gap-2 items-center'>
        <CustomAvatar currentUser={currentUser} />
        <div className='text-2xl font-semibold'>{currentUser.name}</div>
      </div>
      <ChatOptions />
    </div>
  );
};

export default ChatHeading;
