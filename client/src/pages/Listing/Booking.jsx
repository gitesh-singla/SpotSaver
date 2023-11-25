import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { userContext } from "../../Contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DateContext } from "../../Contexts/DateContext";

export default function Booking({ price }) {
  const { selectedDate, startTime, endTime } = useContext(DateContext);
  const cost = price * Math.abs(endTime.getHours() - startTime.getHours());
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const { id } = useParams();

  async function handleBooking() {
    if (!user) {
      navigate("/login");
      return;
    }
    console.log("Booking pressed");
    if (!selectedDate || !startTime || !endTime) {
      console.log("Fields empty");
      return;
    }
    const start = new Date(startTime);
    const end = new Date(endTime);
    try {
      const bookingData = {
        spot: id,
        start,
        end,
        amount: cost
      };
      await axios.post("http://localhost:4000/book", bookingData, {
        withCredentials: true,
      });
      console.log("Booked");
    } catch (error) {
      console.log(error.message);
    }
  }

  function formatDateString(dateString) {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-IN", options);
  }

  function formatTimeString(dateString) {
    const options = {
      hour: "numeric",
      minute: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-IN", options);
  }

  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <div>
        <h2>Date: {formatDateString(selectedDate)}</h2>
      </div>
      <div>
        <h2>Time of Arrival: {formatTimeString(startTime)}</h2>
      </div>
      <div>
        <h2>Time of Departure: {formatTimeString(endTime)}</h2>
      </div>
      <div>
        <h2>Total Cost: Rs. {cost}</h2>
      </div>
      {!user && (
        <button
          onClick={handleBooking}
          className="bg-tblue py-2 px-6 rounded-md text-white"
        >
          Login to Book
        </button>
      )}
      {user && (
        <button
          onClick={handleBooking}
          className="bg-tblue py-2 px-6 rounded-md text-white"
        >
          Book Now!
        </button>
      )}
    </div>
  );
}
