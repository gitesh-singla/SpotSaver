import { useContext } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DateContext } from "../../Contexts/DateContext";

export default function RangeModifier({modifySearch}) {
  const {
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = useContext(DateContext);

  return (
    <div className="rangePicker bg-white flex px-6 py-4 gap-2 text-darkgray scale-[101%] border-2 border-dark rounded-md items-center justify-center max-w-xl">
      <h1 className="text-dark text-lg">On</h1>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        maxDate={new Date().setDate(new Date().getDate() + 6)}
        dateFormat="dd/MM/yyyy"
        className="border-lightgray rounded border-2 min-w-0 px-2 py-1 w-28 outline-none"
      />
      <h1 className="text-dark text-lg">From</h1>
      <DatePicker
        selected={startTime}
        onChange={(date) => setStartTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="border-lightgray rounded border-2 min-w-0  px-2 py-1 w-28 outline-none"
      />
      <h1 className="text-dark text-lg">To</h1>
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
        className="border-lightgray rounded border-2 min-w-0  px-2 py-1 w-28 outline-none"
      />
    </div>
  );
}
