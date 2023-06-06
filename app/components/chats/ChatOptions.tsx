import {
  BsFillTelephoneFill,
  BsFillCameraVideoFill,
  BsFillInfoCircleFill,
} from "react-icons/bs";

const ChatOptions = () => {
  return (
    <div className='flex flex-row gap-2 text-orange-500'>
      <div className='p-2 hover:bg-slate-300 transition rounded-full cursor-pointer'>
        <BsFillTelephoneFill size={24} />
      </div>
      <div className='p-2 hover:bg-slate-300 transition rounded-full cursor-pointer'>
        <BsFillCameraVideoFill size={24} />
      </div>
      <div className='p-2 hover:bg-slate-300 transition rounded-full cursor-pointer'>
        <BsFillInfoCircleFill size={24} />
      </div>
    </div>
  );
};

export default ChatOptions;
