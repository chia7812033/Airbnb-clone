import ListingEdit from "./ListingEdit";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/ui/EmptyState";
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
    title: `${listing?.title} - Edit` || "Place not found",
  };
}

const ListingEditPage = async ({ params }: { params: IParams }) => {
  const { listingId } = params;
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState title='Listing not found' />;
  }

  if (!currentUser) {
    return <EmptyState title='Not log in' subtitle='Please login first' />;
  }

  if (listing.userId != currentUser.id) {
    return (
      <EmptyState
        title='No permission to edit this page'
        subtitle='You can only edit your own properties'
      />
    );
  }

  return (
    <div className='pb-4'>
      <ListingEdit listing={listing} />
    </div>
  );
};

export default ListingEditPage;
