"use client";

import CustomAvatar from "../ui/CustomAvatar";
import LoginMenu from "./LoginMenu";
import MenuOption from "./MenuOption";
import NotLoginMenu from "./NotLoginMenu";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { RiGlobalLine } from "react-icons/ri";

interface MenuProps {
  currentUser?: User | null;
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const [isClick, setIsClick] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsClick((state) => !state);
  }, []);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3 cursor-pointer'>
        <div onClick={toggleOpen} className='border-2 rounded-full p-1'>
          <div className='hover:opacity-80 transition'>
            <CustomAvatar currentUser={currentUser} profile />
          </div>
        </div>
      </div>

      {isClick && (
        <div className=' absolute right-0 w-3/4 min-w-[250px] shadow-md border-[1px] rounded-xl flex flex-col bg-white py-2 mt-2 text-sm'>
          {currentUser ? <LoginMenu /> : <NotLoginMenu />}
        </div>
      )}
    </div>
  );
};

export default Menu;
