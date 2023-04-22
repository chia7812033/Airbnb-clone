"use client";

import Image from "next/image";
import { SafeUser } from "../types";
import { divIcon } from "leaflet";

interface CustomAvatarProps {
  currentUser?: SafeUser | null;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ currentUser }) => {
  if (currentUser) {
    if (currentUser.image) {
      return (
        <Image
          src={currentUser.image}
          height='30'
          width='30'
          alt='avatar'
          className='rounded-full'
          style={{ objectFit: "contain" }}
        />
      );
    } else {
      return (
        <>
          {currentUser.name ? (
            <div className="bg-gray-300 rounded-full px-3 py-1 text-xl">{currentUser.name[0]}</div>
          ) : (
            <Image
              src={"/images/placeholder.jpg"}
              height='30'
              width='30'
              alt='avatar'
              className='rounded-full'
              style={{ objectFit: "contain" }}
            />
          )}
        </>
      );
    }
  }

  return (
    <Image
      src={"/images/placeholder.jpg"}
      height='30'
      width='30'
      alt='avatar'
      className='rounded-full'
      style={{ objectFit: "contain" }}
    />
  );
};

export default CustomAvatar;
