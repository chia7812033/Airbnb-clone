import Historys from "./Historys";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";
import getReservations from "@/app/utils/getReservations";

export const metadata = {
  title: "My Historys",
};

const Page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title={"Not logged in"} />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return <EmptyState title='No trip found' />;
  }

  return <Historys currentUser={currentUser} reservations={reservations} />;
};

export default Page;
