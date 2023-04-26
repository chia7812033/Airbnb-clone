import Counter from "../inputs/Counter";
import useReservation from "@/app/hooks/useReservation";

const ListingGuest = () => {
  const reservationStore = useReservation();

  return (
    <div className='bg-white border-[0.5px] border-t-0 rounded-b-lg px-4 shadow-lg'>
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
