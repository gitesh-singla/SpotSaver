import { useContext } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DateContext } from "../../Contexts/DateContext";

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
    <div className="rangePicker text-white font-semibold bg-primary bg-opacity-95 flex px-6 py-8 mb-8 gap-8 rounded-xl">
      <div>
        <h2 className="text-xl mb-2">Select Date:</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          maxDate={new Date().setDate(new Date().getDate() + 6)}
          dateFormat="dd/MM/yyyy"
          value={selectedDate}
          className="text-darkgray text-lg rounded-xl py-1 px-4 outline-none"
        />
      </div>
      <div>
        <h2 className="text-xl mb-2">Select Time of Arrival:</h2>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h:mm aa"
          value={startTime}
          className="text-darkgray text-lg rounded-xl py-1 px-4 outline-none"
        />
      </div>
      <div>
        <h2 className="text-xl mb-2">Select Time of Departure:</h2>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          minTime={new Date(startTime)}
          maxTime={new Date().setHours(23)}
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h:mm aa"
          value={endTime}
          className="text-darkgray text-lg rounded-xl py-1 px-4 outline-none"
        />
      </div>
    </div>
  );
}
