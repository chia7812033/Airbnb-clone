import Listing from "./Listing";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";
import getListingById from "@/app/utils/getListingById";
import getListingRatings from "@/app/utils/getListingRatings";
import getReviews from "@/app/utils/getReviews";
import getUserRating from "@/app/utils/getUserRating";
import { Metadata } from "next";

interface IParams {
  listingId: string;
}

export async function generateMetadata({
  params,
}: {
  params: IParams;
}): Promise<Metadata> {
  const { listingId } = params;
  const listing = await getListingById(listingId as string);

  return {
    title: `${listing?.title}` || "Place not found",
  };
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { listingId } = params;
  const listing = await getListingById(listingId as string);
  const currentUser = await getCurrentUser();
  const reviews = await getReviews(listingId);
  const rating = await getUserRating(listingId);
  const avgRating = await getListingRatings(listingId);

  if (!listing) {
    return (
      <div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className='pb-4'>
      <Listing
        listing={listing}
        currentUser={currentUser}
        reviews={reviews}
        rating={rating}
        avgRating={avgRating}
      />
    </div>
  );
};

export default ListingPage;
