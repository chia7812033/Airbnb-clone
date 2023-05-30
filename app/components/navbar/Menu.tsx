"use client";

import CustomAvatar from "../ui/CustomAvatar";
import LoginMenu from "./LoginMenu";
import MenuOption from "./MenuOption";
import NotLoginMenu from "./NotLoginMenu";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { RiGlobalLine } from "react-icons/ri";

interface MenuProps {
  currentUser?: User | null;
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3 cursor-pointer'>
        <div onClick={handleClick} className='border-2 rounded-full p-1'>
          <div className='hover:opacity-80 transition'>
            <CustomAvatar currentUser={currentUser} profile />
          </div>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className='shadow-md border-[1px] flex flex-col bg-white text-sm'>
            {currentUser ? <LoginMenu /> : <NotLoginMenu />}
          </div>
        </Popover>
      </div>

      {/* {isClick && (
        <div className=' absolute right-0 w-3/4 min-w-[250px] shadow-md border-[1px] rounded-xl flex flex-col bg-white py-2 mt-2 text-sm'>
          {currentUser ? <LoginMenu /> : <NotLoginMenu />}
        </div>
      )} */}
    </div>
  );
};

export default Menu;
