import DatePicker from "../ui/DatePicker";
import ListingGuest from "./ListingGuest";
import useDateModal from "@/app/hooks/useDateModal";
import useGuestModal from "@/app/hooks/useGuestModal";
import useReservation from "@/app/hooks/useReservation";
import { format, parseISO } from "date-fns";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface ListingDateProps {
  disabledDate: Date[];
}

const ListingDate: React.FC<ListingDateProps> = ({ disabledDate }) => {
  const dateModal = useDateModal();
  const reservationStore = useReservation();
  const guestModal = useGuestModal();

  return (
    <div
      className={`flex flex-col gap-2 border-[0.5px] ${
        guestModal.isOpen ? "rounded-t-xl" : "rounded-xl"
      } p-2 relative cursor-pointer`}
    >
      <div
        onClick={() => {
          dateModal.onOpen();
          guestModal.onClose();
        }}
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
      <div>
        <div
          onClick={() => {
            guestModal.isOpen ? guestModal.onClose() : guestModal.onOpen();
            dateModal.onClose();
          }}
          className='flex justify-between items-center relative'
        >
          <div className='flex flex-col'>
            <div className='text-xs/[20px] font-bolder'>GUESTS</div>
            <div className='text-sm'>{`${reservationStore.guestCount} guest`}</div>
          </div>
          <div>
            {guestModal.isOpen ? (
              <AiFillCaretUp size={24} className='mr-2' />
            ) : (
              <AiFillCaretDown size={24} className='mr-2' />
            )}
          </div>
        </div>

        <div className='absolute z-40 w-full left-0'>
          {guestModal.isOpen && <ListingGuest />}
        </div>
      </div>

      <div className='absolute -top-4 right-0 z-50 shadow-lg'>
        {dateModal.isOpen && <DatePicker disabledDate={disabledDate} />}
      </div>
    </div>
  );
};

export default ListingDate;
