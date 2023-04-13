"use client";

import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

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
        cursor-pointer'
    >
      <div
        className='
          flex
          flex-row
          items-center
          justify-between'
      >
        <div
          className='text-sm px-4 font-semibold'>Anywhere</div>
        <div
          className='text-sm hidden sm:block px-4 font-semibold border-l-[1px] text-center flex-1'>
          Any week
        </div>
        <div
          className='flex flex-row items-center justify-between pr-2'>
          <div
            className='hidden sm:block text-sm border-l-[1px] px-4 text-gray-500'>
            Add guests
          </div>
          <MagnifyingGlassCircleIcon className='h-8 w-8 text-rose-500 rounded-full transition' />
        </div>
      </div>
    </div>
  );
};

export default Search;
