import Reservations from "./Reservations";
import EmptyState from "@/app/components/ui/EmptyState";
import getCurrentUser from "@/app/utils/getCurrentUser";
import getReservations from "@/app/utils/getReservations";

export const metadata = {
  title: "My Reservations",
};

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title={"Not logged in"} />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return <EmptyState />;
  }

  return <Reservations currentUser={currentUser} reservations={reservations} />;
};

export default TripsPage;
