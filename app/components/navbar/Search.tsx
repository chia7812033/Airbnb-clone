"use client";

import { IoSearchCircleSharp } from "react-icons/io5";

const Search = () => {
  return (
    <div
      className='
        border[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
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
        <div
          className='
            text-sm
            px-4
            font-semibold'
        >
          Anywhere
        </div>
        <div
          className='
            text-sm
            hidden
            sm:block
            px-4
            font-semibold
            border-l-[1px]
            text-center
            flex-1'
        >
          Any week
        </div>
        <div
          className='
            flex
            flex-row
            items-center
            justify-between
            pr-2'
        >
          <div
            className='
              hidden
              sm:block
              text-sm
              border-l-[1px]
              px-4
              text-gray-500'
          >
            Add guests
          </div>
          <IoSearchCircleSharp
            size={32}
            className='
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
