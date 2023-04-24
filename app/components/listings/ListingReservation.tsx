import { Range } from "react-date-range";
import Button from "../Button";
import { differenceInCalendarDays } from "date-fns";
import ListingDate from "./ListingDate";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
}) => {
  return (
    <div className='flex flex-col gap-2 border-[1px] border-gray-400 shadow-md rounded-2xl p-4'>
      <div className='font-bold text-lg px-2'>
        {`$ ${price} `}
        <span className='text-gray-400 font-normal text-md'> night</span>
      </div>

      <ListingDate dateRange={dateRange} onChangeDate={onChangeDate} />

      <Button label='Reserve' onClick={onSubmit} />
      <div className='text-center text-sm text-gray-500 font-light'>
        {"You won't be charged yet"}
      </div>
      <div className='text-light underlined'>{`$ ${price} X ${
        dateRange.startDate && dateRange.endDate
          ? Math.abs(
              differenceInCalendarDays(dateRange.startDate, dateRange.endDate)
            )
          : ""
      }
       nights`}</div>
      <hr />
      <div className='flex justify-between font-bold'>
        <div>Total before taxes</div>
        <div>{`$ ${totalPrice}`}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
