import Counter from "../inputs/Counter";
import useReservation from "@/app/hooks/useReservation";

const ListingGuest = () => {
  const reservationStore = useReservation();

  return (
    <div className='bg-white border-2 rounded-lg px-4'>
      <Counter
        title={"Guests"}
        value={reservationStore.guestCount}
        onChange={reservationStore.setGuestCount}
        noBorder
      />
    </div>
  );
};

export default ListingGuest;
