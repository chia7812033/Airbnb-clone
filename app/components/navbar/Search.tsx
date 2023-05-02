"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = () => {
    const params = new URLSearchParams(searchParams);
    params.set("search", search);
    router.replace(`/?${params}`);
  };

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("search", search);
    router.replace(`$/?${params}`);
  };

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
        <div className='flex gap-2 px-3 pl-4 w-full items-center justify-between'>
          <form onSubmit={onSubmitForm} className='w-full'>
            <input
              type='text'
              placeholder='Search'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className='outline-none w-full'
            />
            <input type='submit' className='hidden' />
          </form>

          <IoSearchCircleSharp
            size={32}
            className='
              cursor-pointer
            text-rose-500
              rounded-full
              transition'
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
