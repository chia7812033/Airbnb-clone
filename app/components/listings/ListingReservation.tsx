import { Range, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Button from "../Button";

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
      <DateRange
        editableDateInputs={true}
        onChange={(item) => onChangeDate(item.selection)}
      />
      <Button label='Reserve' onClick={() => {}} />
      <div className='text-center text-sm text-gray-500 font-light'>
        {"You won't be charged yet"}
      </div>
      <hr />
      <div className='flex justify-between font-bold'>
        <div>Total before taxes</div>
        <div>{`$ ${totalPrice}`}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
