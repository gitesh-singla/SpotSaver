import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { userContext } from "../../UserContext";

export default function CreateListing() {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [slots, setSlots] = useState(0);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  // const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(userContext);


  async function addNewListing(e) {
    e.preventDefault();
    const listData = {
      description,
      address,
      price,
      slots,
      type,
      // city,
      location: {
        lat,
        lon,
      },
      active: true,
    };
    try {
      await axios.post("http://localhost:4000/addlisting", listData, {
        withCredentials: true,
      });
      setRedirect("/listings");
    } catch (error) {
      alert(error.message)
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
