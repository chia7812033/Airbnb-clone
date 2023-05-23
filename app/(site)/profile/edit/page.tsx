import ProfileEdit from "./ProfileEdit";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/ui/EmptyState";

export const metadata = {
  title: "My Profile - Edit",
};

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title={"Not logged in"} />;
  }

  return (
    <div className='pb-4'>
      <ProfileEdit user={currentUser} />
    </div>
  );
};

export default ProfilePage;
