import { useState } from "react";

export default function ReservationInfo({ reservation }) {
  const [confirm, setConfirm] = useState(false);

  function formatDateString(dateString) {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-IN", options);
  }

  function formatTimeRange(start, end) {
    const formattedStart = formatDateString(start);
    const formattedEnd = formatDateString(end);

    const startTime = formattedStart.split(", ")[1];
    const endTime = formattedEnd.split(", ")[1];

    return `${formattedStart.split(", ")[0]}, ${startTime} to ${endTime}`;
  }

  const formattedTimeRange = formatTimeRange(
    reservation.start,
    reservation.end
  );
  // console.log(formattedTimeRange); // Output: 5:00 PM to 6:00 PM

  const statusColor = (status) => {
    if (status == "active") return "border-l-green-700";
    if (status == "cancelled") return "border-red-700";
    return "border-l-gray";
  };

  const handleCancel = () => {
    alert("cancelling");
    setConfirm(false);
  };

  return (
      <div
        className={`relative resrevationTile w-full p-4 rounded-xl bg-white border-l-8 border-2 shadow border-lightgray hover:translate-x-2 transition duration-200 border-opacity-75 ${statusColor(
          reservation.status
        )}`}
      >
        <h2 className="text-dark text-xl font-semibold mb-2">
          {reservation.address}
        </h2>
        <h2 className="text-gray text-xl">
          Amount Paid:{" "}
          <span className="font-semibold text-primary">
            {" "}
            Rs {reservation.cost}/-
          </span>
        </h2>
        <h2 className="text-gray text-xl">
          Reservation period:{" "}
          <span className="font-semibold text-primary">
            {formattedTimeRange}
          </span>
        </h2>
        <h2 className="text-gray text-xl">
          Status:{" "}
          <span className="font-semibold text-primary">
            {reservation.status}
          </span>
        </h2>
        {!confirm && <button
        id={"cancel" + reservation._id}
          className="bg-red-500 mt-6 text-white text-xl px-4 py-1 rounded-full hover:bg-red-600 active:scale-95 transition duration-200"
          onClick={() => {setConfirm(true)}}
        >
          Cancel
        </button>}
        {confirm && <div>
          <span className="text-gray text-xl mr-2">Confirm: </span>
          <button className="bg-lightgray mt-2 text-white text-xl px-4 py-1 rounded-full hover:bg-gray active:scale-95 transition duration-200 mr-2" onClick={handleCancel}>Yes</button>
          <button className="bg-lightgray mt-2 text-white text-xl px-4 py-1 rounded-full hover:bg-gray active:scale-95 transition duration-200" onClick={() => {setConfirm(false)}}>No</button>
        </div>}
      </div>
  );
}
