import Trips from "./Trips";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/app/components/ui/EmptyState";

export const metadata = {
  title: "My Trips",
};

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title={"Not logged in"} subtitle={"Please login first"} />
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No any trip found'
        subtitle={"Want to find some place to go?"}
      />
    );
  }

  return <Trips currentUser={currentUser} reservations={reservations} />;
};

export default TripsPage;
