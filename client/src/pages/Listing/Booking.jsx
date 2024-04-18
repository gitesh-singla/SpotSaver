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
        amount: cost,
      };
      await axios.post("/book", bookingData, {
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
    <div className="booking w-56 p-4 rounded-lg border-2 border-dark box-border flex flex-col">
      <h1 className="text-center underline font-bold text-xl mb-2">
        Booking Details:
      </h1>
      <div className="text-lg flex justify-between">
        <span className="text-darkgray">Date:</span>{" "}
        <span className="font-bold text-primary">
          {formatDateString(selectedDate)}
        </span>
      </div>
      <div className="text-lg flex justify-between">
        <span className="text-darkgray">From:</span>{" "}
        <span className="font-bold text-primary">
          {formatTimeString(startTime)}
        </span>
      </div>
      <div className="text-lg flex justify-between">
        <span className="text-darkgray">To:</span>{" "}
        <span className="font-bold text-primary">
          {formatTimeString(endTime)}
        </span>
      </div>
      <div className="text-lg flex justify-between mb-4">
        <span className="text-darkgray">Total Cost:</span>{" "}
        <span className="font-bold text-primary">Rs. {cost}</span>
      </div>
      {!user && (
        <button
          onClick={handleBooking}
          className="bg-tblue py-2 px-4 rounded-md bg-primary text-white self-center hover:scale-105 hover:opacity-90 active:scale-100 transition duration-200"
        >
          Login to Book
        </button>
      )}
      {user && (
        <button
          onClick={handleBooking}
          className="bg-tblue py-2 px-4 rounded-md bg-primary text-white self-center hover:scale-105 hover:opacity-90 active:scale-100 transition duration-200"
        >
          Book Now!
        </button>
      )}
    </div>
  );
}
