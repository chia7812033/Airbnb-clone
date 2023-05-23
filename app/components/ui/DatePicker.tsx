import useReservation from "../../hooks/useReservation";
// theme css file
import Button from "./CustomButton";
import useDateModal from "@/app/hooks/useDateModal";
import { addDays } from "date-fns";
import { Range, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
// main css file
import "react-date-range/dist/theme/default.css";

const DatePicker = () => {
  const DateModal = useDateModal();
  const reservationStore = useReservation();

  return (
    <div className='flex flex-col border-2 border-black rounded-xl overflow-hidden shadow-lg'>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => reservationStore.setDateRange(item.selection)}
        ranges={[reservationStore.dateRange]}
        months={2}
        direction='horizontal'
        minDate={new Date()}
        maxDate={addDays(new Date(), 30)}
      />
      <div className='flex justify-end px-4 -mt-4'>
        <Button label='Close' onClick={DateModal.onClose} outline />
      </div>
    </div>
  );
};

export default DatePicker;
