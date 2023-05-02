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
    <div className='flex-col gap-2'>
      <div>
        <CustomAvatar currentUser={author} />
        {author.name}
      </div>
      <div>{review}</div>
    </div>
  );
};

export default ListingReviewCard;
