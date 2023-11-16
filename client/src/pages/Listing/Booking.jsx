import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { userContext } from "../../UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const {user} = useContext(userContext);
  const navigate = useNavigate();
  const {id} = useParams();

  async function handleBooking() {
    if(!user){
        navigate('/login');
        return;
    }
    console.log("Booking pressed");
    if(!selectedDate || !startTime || !endTime){
        console.log("Fields empty");
        return;
    }
    const date = selectedDate.getDate();
    const start = new Date(startTime);
    start.setDate(date)
    const end = new Date(endTime);
    end.setDate(date)
    // console.log({date, start, end});
    try {
        const bookingData = {
            spot: id,
            start,
            end,
        }
        await axios.post('http://localhost:4000/book', bookingData, {withCredentials: true})
        console.log("Booked");
    } catch(error){
        console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div>
        <h2>Select Date:</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          maxDate={new Date().setDate(new Date().getDate() + 6)}
          dateFormat="dd/MM/yyyy"
          className="border-2 border-tblue"
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
          className="border-2 border-tblue"
        //   minTime={new Date().setHours(new Date().getHours(), 0 , 0)}
        //   maxTime={new Date().setHours(21, 0, 0)}
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
          className="border-2 border-tblue"
        />
      </div>

      <button onClick={handleBooking} className="bg-tblue py-2 px-6 rounded-md text-white">Book Now!</button>
    </div>
  );
}
