import { Range } from "react-date-range";
import { format, parseISO } from "date-fns";
import DatePicker from "../DatePicker";
import useDateModal from "@/app/hooks/useDateModal";

interface ListingDateProps {
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  disabledDate: Date[];
}

const ListingDate: React.FC<ListingDateProps> = ({
  dateRange,
  onChangeDate,
  disabledDate,
}) => {
  const dateModal = useDateModal();

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
              parseISO(dateRange.startDate?.toISOString() || ""),
              "dd/MM/yyyy"
            )}
          </div>
        </div>
        <div className=''>
          <div className='text-xs/[20px] font-bolder'>CHECK-OUT</div>
          <div className='text-sm'>
            {format(
              parseISO(dateRange.endDate?.toISOString() || ""),
              "dd/MM/yyyy"
            )}
          </div>
        </div>
      </div>
      <div>
        <div className='text-xs/[20px] font-bolder'>GUESTS</div>
        <div className='text-sm'>{`1 guest`}</div>
      </div>

      <div className='absolute -top-4 right-0 z-50'>
        {dateModal.isOpen && (
          <DatePicker
            dateRange={dateRange}
            onChangeDate={onChangeDate}
            disabledDate={disabledDate}
          />
        )}
      </div>
    </div>
  );
};

export default ListingDate;
