import Button from "../Button";
import CustomAvatar from "../CustomAvatar";
import { SafeUser } from "@/app/types";
import Image from "next/image";

interface UserBodyProps {
  user: SafeUser;
}

const UserBody: React.FC<UserBodyProps> = ({ user }) => {
  return (
    <div className='relative border-2 border-gray-200 rounded-xl'>
      <div className='flex flex-col gap-2 px-4 py-8'>
        <div className='mb-4 z-10 grow-0 bg-white w-min p-1 rounded-full'>
          <CustomAvatar currentUser={user} size='130' />
        </div>
        <div className='text-2xl font-bold'>{user.name}</div>
        <div>{user.email}</div>
        <div className='flex gap-4'>
          <Button label={"Message"} onClick={() => {}} />
          <Button outline label={"Share profile"} onClick={() => {}} />
        </div>
      </div>
      <div className='absolute bottom-2/3 w-full h-1/3'>
        <Image
          className='rounded-t-xl object-cover'
          fill
          src={"/images/profile-bg.jpg"}
          alt='profile-bg'
        />
      </div>
    </div>
  );
};

export default UserBody;
