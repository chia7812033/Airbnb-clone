"use client";

import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { SafeUser } from "../types";

interface CustomAvatarProps {
  currentUser?: SafeUser | null;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ currentUser }) => {
  return (
    <>
      {currentUser ? (
        currentUser.image ? (
          <Avatar
            className='
              rounded-full h-8 w-8'
            src={currentUser.image}
          />
        ) : (
          <Avatar
            className='
              rounded-full h-8 w-8'
          >
            {currentUser.name ? currentUser.name[0] : ""}
          </Avatar>
        )
      ) : (
        <Avatar
          className='
            rounded-full h-8 w-8'
        />
      )}
    </>
  );
};

export default CustomAvatar;
