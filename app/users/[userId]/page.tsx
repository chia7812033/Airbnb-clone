import User from "./User";
import getUserById from "@/app/actions/getUserById";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  userId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { userId } = params;
  const user = await getUserById(userId as string);

  if (!user) {
    return (
      <div>
        <EmptyState title='User does not exist' />
      </div>
    );
  }

  return (
    <div className='pb-4'>
      <User user={user} />
    </div>
  );
};

export default ListingPage;
