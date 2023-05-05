import getListingById from "@/app/actions/getListingById";
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
  return <div className='pb-4'>123</div>;
};

export default ListingEditPage;
