"use client";

import LikeButton from "@/app/components/LikeButton";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { AiFillStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import Image from "next/image";

interface ListingBodyProps {
  currentUser?: SafeUser | null;
  title: string;
  locationValue: string;
  id: string;
  imageSrc: string;
  reviews?: number;
  rating?: number;
}

const ListingBody: React.FC<ListingBodyProps> = ({
  currentUser,
  title,
  locationValue,
  id,
  imageSrc,
  reviews = 123,
  rating = 4.8,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div className='my-2'>
      <div className='font-bold text-2xl'>{title}</div>
      <div className='flex font-semibold items-center justify-between'>
        <div className='flex gap-2'>
          <div className='flex items-center'>
            <AiFillStar size={16} className='pb-1' />
            <div>{rating}</div>
          </div>
          <div>·</div>
          <div>{reviews} reviews</div>
          <div className='text-gray-400'>.</div>
          <div className='underline'>
            {location?.label}, {location?.region}
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='flex items-center justify-center p-2 px-3 gap-1 hover:bg-gray-300 transition rounded-full'>
            <FiShare size={16} />
            Share
          </div>
          <div className='flex items-center justify-center p-2 px-3 gap-1 hover:bg-gray-300 transition rounded-full'>
            <LikeButton currentUser={currentUser} listingId={id} black />
            Save
          </div>
        </div>
      </div>
      <div className='relative w-full md:5/6 lg:w-4/5 xl:w-3/4 2xl:2/3 h-[60vh] my-4'>
        <Image
          alt={imageSrc}
          src={imageSrc}
          fill
          className='object-cover w-full rounded-2xl'
        />
      </div>
    </div>
  );
};

export default ListingBody;
