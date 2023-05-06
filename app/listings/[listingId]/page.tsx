import Listing from "./Listing";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getListingRatings from "@/app/actions/getListingRatings";
import getReservations from "@/app/actions/getReservations";
import getReviews from "@/app/actions/getReviews";
import getUserRating from "@/app/actions/getUserRating";
import EmptyState from "@/app/components/EmptyState";
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
  const reservations = await getReservations({ listingId });
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
        reservations={reservations}
        reviews={reviews}
        rating={rating}
        avgRating={avgRating}
      />
    </div>
  );
};

export default ListingPage;
