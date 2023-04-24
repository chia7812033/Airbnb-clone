import { Range, DateRange } from "react-date-range";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Button from "./Button";
import useDateModal from "@/app/hooks/useDateModal";

interface DatePickerProps {
  onChangeDate: (value: Range) => void;
  dateRange: Range;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChangeDate, dateRange }) => {
  const DateModal = useDateModal();

  return (
    <div className='flex flex-col border-2 border-black rounded-xl overflow-hidden shadow-lg'>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => onChangeDate(item.selection)}
        ranges={[dateRange]}
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
