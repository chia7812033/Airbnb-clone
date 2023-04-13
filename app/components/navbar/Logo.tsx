"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
      <Image
        alt='logo'
        className='hidden md:block cursor-pointer'
        height={120}
        width={120}
        src='/images/new_logo.png'
      />
    );
};

export default Logo;
