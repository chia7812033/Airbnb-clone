import { Metadata } from "next";

interface IParams {
  chatId: string;
}

export async function generateMetadata({
  params,
}: {
  params: IParams;
}): Promise<Metadata> {
  const { chatId } = params;

  return {
    title: `${chatId}` || "Chat not found",
  };
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { chatId } = params;

  return <div className='pb-4'>{chatId}</div>;
};

export default ListingPage;
