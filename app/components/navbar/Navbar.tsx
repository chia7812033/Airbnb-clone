"use client";

import Container from "../ui/Container";
import Menu from "./Menu";
import Searchbar from "./Searchbar";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();

  return (
    <div className='fixed w-full bg-white z-20 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
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
              <Image
                alt='logo'
                height={120}
                width={120}
                src='/images/new_logo.png'
              />
            </div>
            <Searchbar />
            <Menu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {/* <Categories /> */}
    </div>
  );
};

export default Navbar;
