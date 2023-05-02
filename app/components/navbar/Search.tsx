"use client";

import { IoSearchCircleSharp } from "react-icons/io5";

const Search = () => {
  return (
    <div
      className='
        border[1px]
        w-full
        md:w-auto
        lg:w-1/3
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        border-[1px]
        border-gray-200'
    >
      <div
        className='
          flex
          flex-row
          items-center
          justify-between'
      >
        <div className='flex gap-2 px-3 pl-4 w-full'>
          <input
            type='text'
            placeholder='Search'
            className='outline-none w-full'
          />
          <IoSearchCircleSharp
            size={32}
            className='
              cursor-pointer
            text-rose-500
              rounded-full
              transition'
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
