import Host from "./Host";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";
import getMyProperties from "@/app/utils/getMyProperties";
import getReservations from "@/app/utils/getReservations";

export const metadata = {
  title: "Host dashboard",
};

const Page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title={"Not logged in"} />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });
  const properties = await getMyProperties();

  return (
    <Host
      currentUser={currentUser}
      reservations={reservations}
      properties={properties}
    />
  );
};

export default Page;
