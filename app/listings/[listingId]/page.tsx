import Listing from "./Listing";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import getReviews from "@/app/actions/getReviews";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { listingId } = params;
  const listing = await getListingById(listingId as string);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ listingId });
  const reviews = await getReviews(listingId);

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
      />
    </div>
  );
};

export default ListingPage;
