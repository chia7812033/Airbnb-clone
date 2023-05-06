import CustomAvatar from "../CustomAvatar";
import { SafeUser } from "@/app/types";
import React from "react";

interface ListingReviewCardProps {
  author: SafeUser;
  review: string;
}

const ListingReviewCard: React.FC<ListingReviewCardProps> = ({
  author,
  review,
}) => {
  return (
    <div className='flex gap-2 my-2'>
      <div className='cursor-pointer'>
        <CustomAvatar currentUser={author} />
      </div>
      <div className='flex-col gap-2 rounded-xl bg-slate-200 px-4 py-2'>
        <div className='text-sm'>{author.name}</div>
        <div className='text-md'>{review}</div>
      </div>
    </div>
  );
};

export default ListingReviewCard;
