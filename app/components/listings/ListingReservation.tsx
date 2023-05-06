import Button from "../CustomButton";
import ListingDate from "./ListingDate";
import useReservation from "@/app/hooks/useReservation";
import { differenceInCalendarDays } from "date-fns";

interface ListingReservationProps {
  price: number;
  onSubmit: () => void;
  disabled: boolean;
  disabledDate: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  onSubmit,
  disabled,
  disabledDate,
}) => {
  const reservationStore = useReservation();

  return (
    <div className='flex flex-col gap-2 border-[1px] border-gray-400 shadow-md rounded-2xl p-4'>
      <div className='font-bold text-lg px-2'>
        {`$ ${price} `}
        <span className='text-gray-400 font-normal text-md'> night</span>
      </div>

      <ListingDate disabledDate={disabledDate} />

      <Button label='Reserve' onClick={onSubmit} disabled={disabled} />
      <div className='text-center text-sm text-gray-500 font-light'>
        {"You won't be charged yet"}
      </div>
      <div className='text-light underlined'>{`$ ${price} X ${
        reservationStore.dateRange.startDate &&
        reservationStore.dateRange.endDate
          ? Math.abs(
              differenceInCalendarDays(
                reservationStore.dateRange.startDate,
                reservationStore.dateRange.endDate
              )
            )
          : ""
      }
       nights`}</div>
      <hr />
      <div className='flex justify-between font-bold'>
        <div>Total before taxes</div>
        <div>{`$ ${reservationStore.totalPrice}`}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
