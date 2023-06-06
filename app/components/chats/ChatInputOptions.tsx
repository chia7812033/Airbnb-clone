import { AiOutlineGif } from "react-icons/ai";
import { BsFillPlusCircleFill, BsFillEmojiKissFill } from "react-icons/bs";
import { IoMdPhotos } from "react-icons/io";

const ChatInputOptions = () => {
  return (
    <div className='flex flex-row gap-2 text-orange-500'>
      <div className='hover:bg-gray-100 transition rounded-full cursor-pointer p-1'>
        <BsFillPlusCircleFill size={24} />
      </div>

      <div className='hover:bg-gray-100 transition rounded-full cursor-pointer p-1'>
        <IoMdPhotos size={24} />
      </div>
      <div className='hover:bg-gray-100 transition rounded-full cursor-pointer p-1'>
        <BsFillEmojiKissFill size={24} />
      </div>
      <div className='hover:bg-gray-100 transition rounded-full cursor-pointer p-1'>
        <AiOutlineGif size={24} />
      </div>
    </div>
  );
};

export default ChatInputOptions;
