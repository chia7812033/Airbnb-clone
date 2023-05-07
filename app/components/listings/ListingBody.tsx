"use client";

import LikeButton from "../ui/LikeButton";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { FiShare } from "react-icons/fi";

interface ListingBodyProps {
  currentUser?: SafeUser | null;
  title: string;
  locationValue: string;
  id: string;
  imageSrc: string;
  reviews?: number;
  avgRating?: number;
}

const ListingBody: React.FC<ListingBodyProps> = ({
  currentUser,
  title,
  locationValue,
  id,
  imageSrc,
  reviews = 123,
  avgRating = 5,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div className='my-2 w-full md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3'>
      <div className='font-bold text-2xl'>{title}</div>
      <div className='flex font-semibold items-center justify-between'>
        <div className='flex gap-2'>
          <div className='flex items-center'>
            <AiFillStar size={16} className='pb-1' />
            <div>
              {avgRating > 5 || avgRating < 0
                ? 5
                : Math.round(avgRating * 10) / 10}
            </div>
          </div>
          <div>·</div>
          <div>{reviews} reviews</div>
          <div className='text-gray-400'>.</div>
          <div className='underline'>
            {location?.label}, {location?.region}
          </div>
        </div>
        <div className='flex gap-2'>
          <div
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.host}/listings/${id}`
              );
              toast.success("Already copy to clipboard");
            }}
            className='flex items-center justify-center p-2 px-3 gap-1 hover:bg-gray-300 transition rounded-full cursor-pointer'
          >
            <FiShare size={16} />
            Share
          </div>
          <div className='flex items-center justify-center p-2 px-3 gap-1 hover:bg-gray-300 transition rounded-full'>
            <LikeButton currentUser={currentUser} listingId={id} black />
            Save
          </div>
        </div>
      </div>
      <div className='relative h-[60vh] my-4'>
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
