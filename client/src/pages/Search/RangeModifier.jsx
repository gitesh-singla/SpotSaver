import { useContext } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DateContext } from "../../DateContext";

export default function RangePicker({modifySearch}) {
  const {
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = useContext(DateContext);

  return (
    <div className="rangePicker bg-white flex px-6 py-4 gap-2 text-black items-center justify-between">
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          maxDate={new Date().setDate(new Date().getDate() + 6)}
          dateFormat="dd/MM/yyyy"
          value={selectedDate}
          className="border-tblue border-2 min-w-0 w-28"
        />
      </div>
      <div>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h:mm aa"
          value={startTime}
          className="border-tblue border-2 min-w-0 w-28"
        />
      </div>
      <div>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h:mm aa"
          value={endTime}
          className="border-tblue border-2 min-w-0 w-28"
        />
      </div>
      <button className="bg-tblue text-white p-2 rounded-md" onClick={modifySearch}>Search</button>
    </div>
  );
}
