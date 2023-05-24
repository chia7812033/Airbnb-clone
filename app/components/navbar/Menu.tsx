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
        <div
          onClick={() => router.push("/createHotel")}
          className='hidden lg:block rounded-full hover:bg-gray-100 transition px-3 py-2'
        >
          Host my place
        </div>
        <RiGlobalLine
          size={40}
          className=' hidden md:block hover:bg-gray-100 transition rounded-full p-2'
        />
        <div onClick={toggleOpen} className='border-2 rounded-full p-1'>
          <div className='hover:opacity-80 transition'>
            <CustomAvatar currentUser={currentUser} profile />
          </div>
        </div>
      </div>

      {isClick && (
        <div className=' absolute right-0 w-3/4 min-w-[250px] shadow-md border-[1px] rounded-xl flex flex-col bg-white py-2 mt-2 text-sm'>
          {currentUser ? <LoginMenu /> : <NotLoginMenu />}
          <hr />
          <MenuOption
            onClick={() => router.push("/createHotel")}
            label={"Host my place"}
          />
          {currentUser && (
            <MenuOption
              onClick={() => router.push("/profile")}
              label={"Profile"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
