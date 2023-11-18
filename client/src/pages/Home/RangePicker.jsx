import { useContext } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DateContext } from "../../DateContext";

export default function RangePicker() {
  const {
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = useContext(DateContext);

  return (
    <div className="rangePicker bg-gray flex px-6 py-4 mb-8 gap-8 text-black">
      <div>
        <h2>Select Date:</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          maxDate={new Date().setDate(new Date().getDate() + 6)}
          dateFormat="dd/MM/yyyy"
          value={selectedDate}
        />
      </div>
      <div>
        <h2>Select Time of Arrival:</h2>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h:mm aa"
          value={startTime}
        />
      </div>
      <div>
        <h2>Select Time of Departure:</h2>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h:mm aa"
          value={endTime}
        />
      </div>
    </div>
  );
}
