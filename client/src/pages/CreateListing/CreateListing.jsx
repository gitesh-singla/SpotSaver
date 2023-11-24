import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { userContext } from "../../UserContext";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function CreateListing() {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [slots, setSlots] = useState(0);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [startTiming, setStartTiming] = useState();
  const [endTiming, setEndTiming] = useState();
  // const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(userContext);

  useEffect(() => {
    const startDefault = new Date();
    startDefault.setHours(startDefault.getHours() + 1);
    startDefault.setMinutes(0);
    startDefault.setSeconds(0);
    const endDefault = new Date();
    endDefault.setHours(endDefault.getHours() + 2);
    endDefault.setDate(startDefault.getDate())
    endDefault.setMinutes(0);
    endDefault.setSeconds(0);
    setStartTiming(startDefault);
    setEndTiming(endDefault);
  }, []);

  useEffect(() => {
    console.log(startTiming, endTiming);
  }, [startTiming, endTiming]);

  async function addNewListing(e) {
    e.preventDefault();
    const listData = {
      description,
      address,
      price,
      slots,
      type,
      startTiming,
      endTiming,
      // city,
      location: {
        lat,
        lon,
      },
      status: "active",
    };
    try {
      await axios.post("http://localhost:4000/addlisting", listData, {
        withCredentials: true,
      });
      setRedirect("/listings");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }

  function getLocation(e) {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        function (error) {
          console.log(error);
        }
      );
    }
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  if (redirect != "") {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mt-8 bg-slate-400 mx-auto w-fit p-8 rounded-xl">
      <form
        className="flex flex-col justify-center max-w-4xl mx-auto "
        encType="multipart/form-data"
        onSubmit={addNewListing}
      >
        <h2 className="text-lg text-white">Address</h2>
        <input
          type="text"
          value={address}
          placeholder="Address..."
          className="mb-4"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></input>
        <h2 className="text-lg text-white">Price/Hour</h2>
        <input
          type="number"
          value={price}
          placeholder="Title..."
          className="mb-4"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></input>
        <h2 className="text-lg text-white">Description</h2>
        <textarea
          rows={3}
          value={description}
          className="mb-4"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <h2 className="text-lg text-white">Type</h2>
        <input
          type="text"
          value={type}
          placeholder="Type..."
          className="mb-4"
          onChange={(e) => {
            setType(e.target.value);
          }}
        ></input>
        <h2 className="text-lg text-white">Active Hours</h2>
        <div className="flex gap-4">
          <span>From</span>
          <DatePicker
            selected={startTiming}
            onChange={(date) => setStartTiming(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
            value={startTiming}
            className="border-tblue border-2 min-w-0 w-28"
          />
          <span>To</span>
          <DatePicker
            selected={endTiming}
            onChange={(date) => setEndTiming(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
            value={endTiming}
            className="border-tblue border-2 min-w-0 w-28"
          />
        </div>
        <h2 className="text-lg text-white">Location</h2>
        <div className="flex justify-between">
          <input
            type="number"
            value={lat}
            onChange={(e) => {
              setLat(e.target.value);
            }}
          ></input>
          <input
            type="number"
            value={lon}
            onChange={(e) => {
              setLon(e.target.value);
            }}
          ></input>
          <button className="text-black bg-primary" onClick={getLocation}>
            Get Location
          </button>
        </div>
        <h2 className="text-lg text-white">Slots:</h2>
        <input
          type="number"
          value={slots}
          onChange={(e) => {
            setSlots(e.target.value);
          }}
        ></input>
        <button
          className="bg-primary py-2 px-4 rounded-full mb-16 mt-6"
          onClick={addNewListing}
        >
          Add
        </button>
      </form>
    </div>
  );
}
