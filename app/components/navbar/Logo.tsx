"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";

const Logo = () => {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push("/")}
        className='block md:hidden cursor-pointer ml-1'
      >
        <AiFillHome size={32} className='text-orange-500' />
      </div>
      <div
        onClick={() => router.push("/")}
        className='hidden md:block cursor-pointer'
      >
        <Image alt='logo' height={120} width={120} src='/images/new_logo.png' />
      </div>
    </>
  );
};

export default Logo;
