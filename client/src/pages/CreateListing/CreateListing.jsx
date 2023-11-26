import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { userContext } from "../../Contexts/UserContext";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import MapComponent from "./MapComponent";

export default function CreateListing() {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [slots, setSlots] = useState(0);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [pincode, setPincode] = useState("  ");
  const [startTiming, setStartTiming] = useState();
  const [endTiming, setEndTiming] = useState();
  const [type, setType] = useState("small");
  const [redirect, setRedirect] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const { user } = useContext(userContext);

  useEffect(() => {
    const startDefault = new Date();
    startDefault.setHours(startDefault.getHours() + 1);
    startDefault.setMinutes(0);
    startDefault.setSeconds(0);
    const endDefault = new Date();
    endDefault.setHours(endDefault.getHours() + 2);
    endDefault.setDate(startDefault.getDate());
    endDefault.setMinutes(0);
    endDefault.setSeconds(0);
    setStartTiming(startDefault);
    setEndTiming(endDefault);
  }, []);

  async function addNewListing(e) {
    e.preventDefault();

    const formData = new FormData();
    const location = {
      lat,
      lon,
    };

    formData.append("description", description);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("slots", slots);
    formData.append("type", type);
    formData.append("startTiming", startTiming);
    formData.append("endTiming", endTiming);
    formData.append("location", JSON.stringify(location));
    formData.append("status", "active");

    imageFiles.forEach((file) => {
      formData.append(`spotImages`, file);
    });

    try {
      await axios.post("http://localhost:4000/addlisting", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRedirect("/myspots");
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
  async function getPinLoaction(e) {
    e.preventDefault();
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${pincode}`
    );
    setLat(+data[0].lat);
    setLon(+data[0].lon);
  }

  const handleImageUpload = (e) => {
    if (imageFiles.length == 10) return;
    const maxFileSize = 1024 * 1024; //1MB
    const selectedImages = Array.from(e.target.files);
    const filteredImages = selectedImages.filter((image, index) => {
      if (index >= 10 - imageFiles.length) return false; // to prevent no. of images from exceeding 10
      return image.size <= maxFileSize;
    });
    setImageFiles([...imageFiles, ...filteredImages]);
  };

  const removeImage = (e, index) => {
    e.preventDefault();
    const updatedImages = [...imageFiles];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);
  };

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
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="small">Small</option>
          <option value="big">Big</option>
          <option value="heavy">Heavy</option>
        </select>
        <h2 className="text-lg text-white">Images</h2>
        <h3>max no. of images: 10 max size: 1MB</h3>
        <input
          type="file"
          className="mb-4"
          multiple
          onChange={(e) => handleImageUpload(e)}
          accept=".jpg, .jpeg, .png"
        ></input>
        {/* Display thumbnails and remove buttons for selected images */}
        <div className="flex flex-wrap gap-2">
          {imageFiles.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Thumbnail ${index}`}
                className="w-16 h-16 object-cover rounded"
              />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                onClick={(e) => removeImage(e, index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <h2 className="text-lg text-white">Active Hours</h2>
        <div className="flex gap-4">
          <span>From</span>
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
            className="border-tblue border-2 min-w-0 w-28"
          />
          <span>To</span>
          <DatePicker
            selected={endTiming}
            onChange={(date) => setEndTiming(date)}
            minTime={startTiming}
            maxTime={new Date().setHours(23)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            popperPlacement="right"
            timeCaption="Time"
            dateFormat="h:mm aa"
            value={endTiming}
            className="border-tblue border-2 min-w-0 w-28"
          />
        </div>
        <h2 className="text-lg text-white">Slots:</h2>
        <input
          type="number"
          value={slots}
          min={1}
          onChange={(e) => {
            setSlots(e.target.value);
          }}
        ></input>
        <h2 className="text-lg text-white">Location</h2>
        <div className="flex justify-between gap-2 mb-2">
          <input
            type="text"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
            }}
          ></input>
          <button className="text-black bg-primary" onClick={getPinLoaction}>
            Get Pin Location
          </button>
          <button className="text-black bg-primary" onClick={getLocation}>
            Get Location
          </button>
        </div>
        <MapComponent lat={lat} setLat={setLat} lon={lon} setLon={setLon} />
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
