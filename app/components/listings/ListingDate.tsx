import { Range } from "react-date-range";
import { format, parseISO } from "date-fns";
import DatePicker from "../DatePicker";
import useDateModal from "@/app/hooks/useDateModal";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import useReservation from "@/app/hooks/useReservation";

interface ListingDateProps {
  disabledDate: Date[];
}

const ListingDate: React.FC<ListingDateProps> = ({ disabledDate }) => {
  const dateModal = useDateModal();
  const reservationStore = useReservation();

  return (
    <div className=' flex flex-col gap-2 border-[0.5px] rounded-xl p-2 relative cursor-pointer'>
      <div
        onClick={() => dateModal.onOpen()}
        className='grid grid-cols-2 justify-between gap-2 border-b-[0.5px] pb-1'
      >
        <div className='border-r-[0.5px] pr-2'>
          <div className='text-xs/[20px] font-bolder'>CHECK-IN</div>
          <div className='text-sm'>
            {format(
              parseISO(
                reservationStore.dateRange.startDate?.toISOString() || ""
              ),
              "dd/MM/yyyy"
            )}
          </div>
        </div>
        <div className=''>
          <div className='text-xs/[20px] font-bolder'>CHECK-OUT</div>
          <div className='text-sm'>
            {format(
              parseISO(reservationStore.dateRange.endDate?.toISOString() || ""),
              "dd/MM/yyyy"
            )}
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div>
          <div className='text-xs/[20px] font-bolder'>GUESTS</div>
          <div className='text-sm'>{`1 guest`}</div>
        </div>
        <AiFillCaretDown size={24} className='mr-2' />
      </div>

      <div className='absolute -top-4 right-0 z-50'>
        {dateModal.isOpen && <DatePicker disabledDate={disabledDate} />}
      </div>
    </div>
  );
};

export default ListingDate;
