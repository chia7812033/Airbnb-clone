import ReviewInput from "../inputs/ReviewInput";
import ListingReviewCard from "./ListingReviewCard";
import { SafeRating, SafeReview, SafeUser } from "@/app/types";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ListingReviewsProps {
  listingId: string;
  currentUser?: SafeUser | null;
  reviews?: SafeReview[];
  rating?: SafeRating;
}

const ListingReviews: React.FC<ListingReviewsProps> = ({
  listingId,
  currentUser,
  reviews = [],
  rating,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRating, setCurrentRating] = useState(rating?.rating);

  const router = useRouter();

  const setRating = (value: number | null) => {
    if (!value) return;
    setCurrentRating(value);
    setIsLoading(true);

    axios
      .post("/api/rating", { listingId, rating: value })
      .then(() => {
        router.refresh();
      })
      .catch((error) => toast.error(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='flex-col gap-2'>
      <div className='text-xl font-semibold md-2'>Reviews</div>
      {currentUser && (
        <>
          <div>
            <Rating
              name='simple-controlled'
              value={currentRating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              disabled={isLoading}
            />
          </div>
          <div className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2'>
            <ReviewInput listingId={listingId} currentUser={currentUser} />
          </div>
        </>
      )}

      <div>
        {reviews.map((item) => (
          <ListingReviewCard
            key={item.id}
            author={item.user}
            review={item.comment}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingReviews;
