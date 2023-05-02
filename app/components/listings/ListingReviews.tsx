import ReviewInput from "../inputs/ReviewInput";
import ListingReviewCard from "./ListingReviewCard";
import { SafeReview, SafeUser } from "@/app/types";

interface ListingReviewsProps {
  listingId: string;
  currentUser?: SafeUser | null;
  reviews?: SafeReview[];
}

const ListingReviews: React.FC<ListingReviewsProps> = ({
  listingId,
  currentUser,
  reviews = [],
}) => {
  return (
    <div className='flex-col gap-2'>
      <div className='text-xl font-semibold md-2'>Reviews</div>
      <div className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2'>
        <ReviewInput listingId={listingId} currentUser={currentUser} />
      </div>
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
