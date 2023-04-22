import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import Listing from "./Listing";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { listingId } = params;
    const listing = await getListingById(listingId as string);
    const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div>
      <Listing listing={listing} currentUser={currentUser}/>
    </div>
  );
};

export default ListingPage;
