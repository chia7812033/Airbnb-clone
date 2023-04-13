"use client";

import { GlobeAltIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Avatar from "../Avatar";

import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  const [isClick, setIsClick] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsClick((state) => !state);
  }, []);

  return (
    <div className='relative'>
      <div
        className='
        flex
        flex-row
        items-center
        gap-3
        cursor-pointer'
      >
        <div
          className='
          hidden
          lg:block
          rounded-full
          hover:bg-gray-100
          transition
          px-3
          py-2'
        >
          Airbnb your home
        </div>
        <GlobeAltIcon
          className='
            hidden
            md:block
            w-10
            h-10
          hover:bg-gray-100
            transition
            rounded-full
            p-2'
        />
        <div
          onClick={toggleOpen}
          className='
          flex
          flex-row
          border
          rounded-full
          lg:p-3
          lg:py-2
          md:p-2
          p-1
          hover:shadow-md
          transition
          gap-2
          items-center'
        >
          <Bars3Icon className='w-6 h-6' />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>

      {isClick && (
        <div className='absolute right-0 w-[40vm] md:w-3/4 shadow-md border-[1px] rounded-xl flex flex-col bg-white py-2 mt-2 text-sm'>
          <MenuItem onClick={() => {}} label={"Sign up"} isBold={true} />
          <MenuItem onClick={() => {}} label={"Log in"} isBold={false} />
          <div className='border-b-[1px] my-2' />
          <MenuItem
            onClick={() => {}}
            label={"Airbnb your home"}
            isBold={false}
          />
          <MenuItem onClick={() => {}} label={"Help"} isBold={false} />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
