// From RoomReservation
import { DateRange } from "react-date-range";

const DatePicker = ({ value, handleSelect }) => {
  return (
    <DateRange
      rangeColors={["#065f46"]}
      date={value.startDate}
      direction="vertical"
      showDateDisplay={false}
      className="w-full text-green-900"
      minDate={value.startDate}
      maxDate={value.endDate}
      ranges={[value]}
      onChange={handleSelect}
    />
  );
};

export default DatePicker;
