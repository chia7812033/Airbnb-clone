import { AiOutlineGif } from "react-icons/ai";
import { BsFillPlusCircleFill, BsFillEmojiKissFill } from "react-icons/bs";
import { IoMdPhotos } from "react-icons/io";

const ChatInputOptions = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-row gap-2 text-orange-500'>
        <BsFillPlusCircleFill size={24} />
        <IoMdPhotos size={24} />
        <BsFillEmojiKissFill size={24} />
        <AiOutlineGif size={24} />
      </div>
    </div>
  );
};

export default ChatInputOptions;
