import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function SpotInfo({ spot }) {
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

    return `${startTime} to ${endTime}`;
  }

  const [statusSwitch, setStatusSwitch] = useState(spot.status);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [price, setPrice] = useState(spot.price);
  const [slots, setSlots] = useState(spot.slots);
  const [startTiming, setStartTiming] = useState(new Date(spot.startTiming));
  const [endTiming, setEndTiming] = useState(new Date(spot.endTiming));

  function handleStatusSwitch(event) {
    if (event.target.checked) {
      setStatusSwitch("active");
    } else {
      setStatusSwitch("disabled");
    }
  }

  async function handleEditSpot() {
    setShowLoading(true)
    const patchData = {price, slots, status: statusSwitch, startTiming, endTiming}
    try {
      await axios.patch(`http://localhost:4000/editspot?spotID=${spot._id}`, patchData, {withCredentials: true});
      window.location.reload();
    } catch(error) {
      console.log(error.response);
    } finally {
      setEditModalOpen(false);
      setShowLoading(false);
    }
  }

  async function handleDeleteSpot() {
    setShowLoading(true)
    try {
      await axios.delete(`http://localhost:4000/deletespot?spotID=${spot._id}`, {withCredentials: true});
      window.location.reload();
    } catch(error) {
      console.log(error.response);
    } finally {
      setDeleteModalOpen(false);
      setShowLoading(false);
    }
  }

  function statusBGColor() {
    return spot.status == "active" ? "bg-white" : "bg-lightgray";
  }

  function openDeleteModal() {
    setDeleteModalOpen(true);
  }
  function closeDeleteModal() {
    setDeleteModalOpen(false);
  }

  function openEditModal() {
    setEditModalOpen(true);
  }
  function closeEditModal() {
    setEditModalOpen(false);
  }

  return (
    <div
      className={`spotTile w-full p-4 rounded-xl shadow border-2 border-lightgray " + ${statusBGColor()}`}
    >
      <h2 className="text-dark text-xl font-semibold mb-2">{spot.address}</h2>
      <h2 className="text-gray text-xl">
        Price:{" "}
        <span className="font-semibold text-primary"> Rs {spot.price}/-</span>
      </h2>
      <h2 className="text-gray text-xl">
        Active period:{" "}
        <span className="font-semibold text-primary">
          {formatTimeRange(spot.startTiming, spot.endTiming)}
        </span>
      </h2>
      <h2 className="text-gray text-xl">
        Total slots:{" "}
        <span className="font-semibold text-primary">{spot.slots}</span>
      </h2>
      <h2 className="text-gray text-xl">
        Status:{" "}
        <span className="font-semibold text-primary">{spot.status}</span>
      </h2>
      <div className="edit-disable flex mt-6 gap-4 items-center">
        <button
          className="bg-gray text-white text-xl px-4 py-1 rounded-full hover:bg-primary active:scale-95 transition duration-200"
          onClick={openEditModal}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white text-xl px-4 py-1 rounded-full hover:bg-red-400 active:scale-95 transition duration-200"
          onClick={openDeleteModal}
        >
          Delete
        </button>
      </div>

      {deleteModalOpen && (
        <div className="modal" onClick={closeDeleteModal}>
          <div className="modal-content bg-white p-4 rounded">
          <h2 className="text-primary font-semibold text-lg">Delete Spot?</h2>
            <div className="flex gap-4 mt-2">
              <button
                className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-400 active:scale-95 transition duration-200"
                onClick={handleDeleteSpot}
              >
                Yes
              </button>
              <button
                className="bg-gray text-white px-4 py-1 rounded-full hover:bg-lightgray active:scale-95 transition duration-200"
                onClick={closeDeleteModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {editModalOpen && (
        <div className="modal">
          <div className="modal-content bg-white p-4 rounded border-primary border-2 text-gray min-w-[300px]">
            <h2 className="text-primary font-semibold text-lg">Edit Spot</h2>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">Price: </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={0}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Price/hr"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">Slots: </label>
              <input
                type="number"
                value={slots}
                onChange={(e) => setSlots(e.target.value)}
                min={1}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Slots"
              />
            </div>
            <div className="flex gap-2 items-center mb-4">
              <div>
                <h2>From</h2>
                <DatePicker
                  selected={startTiming}
                  onChange={(date) => setStartTiming(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  popperPlacement="right"
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  value={startTiming}
                  className="p-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 min-w-0"
                />
              </div>
              <div>
                <h2>To</h2>
                <DatePicker
                  selected={endTiming}
                  onChange={(date) => setEndTiming(date)}
                  minTime={new Date().setHours(startTiming.getHours())}
                  maxTime={new Date().setHours(23)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  popperPlacement="left"
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  value={endTiming}
                  className="p-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 min-w-0"
                />
              </div>
            </div>
            <div>
              <input
                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={handleStatusSwitch}
                checked={statusSwitch == "active"}
              />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="flexSwitchCheckDefault"
              >
                {statusSwitch}
              </label>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-400 active:scale-95 transition duration-200"
                onClick={handleEditSpot}
              >
                Save
              </button>
              <button
                className="bg-gray text-white px-4 py-1 rounded-full hover:bg-lightgray active:scale-95 transition duration-200"
                onClick={closeEditModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showLoading && <LoadingOverlay />}
    </div>
  );
}
