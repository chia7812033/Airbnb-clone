import ProfileEdit from "./ProfileEdit";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getProperties from "@/app/actions/getProperties";
import EmptyState from "@/app/components/EmptyState";

export const metadata = {
  title: "My Profile - Edit",
};

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title={"Not logged in"} subtitle={"Please login first"} />
    );
  }
  const properties = await getProperties(currentUser.id);

  return (
    <div className='pb-4'>
      <ProfileEdit user={currentUser} />
    </div>
  );
};

export default ProfilePage;
