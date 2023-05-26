import ProfileEdit from "./ProfileEdit";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";

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
