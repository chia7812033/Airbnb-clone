import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import Reservations from "./Reservations";

export const metadata = {
  title: "My Reservations",
};

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title={"Not logged in"} subtitle={"Please login first"} />
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return <EmptyState />;
  }

  return <Reservations currentUser={currentUser} reservations={reservations} />;
};

export default TripsPage;
