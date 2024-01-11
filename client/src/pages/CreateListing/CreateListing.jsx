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
  const [pincode, setPincode] = useState("");
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
  async function getPinLocation(e) {
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
    <section className="section-container ">
      <div className=" max-w-[700px] w-full">
        <div className="flex flex-col sm:py-12">
          <div className="">
            <h2 className="leading-relaxed font-semibold text-3xl text-gray-700">
              Add a spot
            </h2>
            <div className="divide-y divide-gray">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Address</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Price (per Hour)</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">From</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
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
                        className="pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      <img
                        src="/clock.svg"
                        width={"20px"}
                        className="absolute left-3 top-2"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Till</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
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
                        className="pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      <img
                        src="/clock.svg"
                        width={"20px"}
                        className="absolute left-3 top-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Description</label>
                  <textarea
                    className=" resize-none px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Description"
                    rows={4}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Slots</label>
                  <input
                    type="number"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Slots"
                    min={1}
                    onChange={(e) => {
                      setSlots(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Type</label>
                  <select
                    onChange={(e) => setType(e.target.value)}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  >
                    <option value="small">Small</option>
                    <option value="big">Big</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">
                    Upload Images{" "}
                    <span className="text-gray text-base">
                      (upto 10 images)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {imageFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Thumbnail ${index}`}
                          className="object-cover rounded-lg w-28 h-20 hover:-translate-y-1 transition duration-100"
                        />
                        <button
                          className="absolute top-1 right-1 bg-primary text-white px-2 opacity-80 rounded-full hover:opacity-100 active:scale-95"
                          onClick={(e) => removeImage(e, index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <label
                      for="upload"
                      className="flex flex-col items-center gap-2 cursor-pointer w-28 h-20 border-secondary border-2 rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 fill-white stroke-primary"
                        viewBox="0 -3 26 26"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-darkgray font-medium text-sm ">
                        Max: 1MB
                      </span>
                    </label>
                  </div>
                  <input
                    id="upload"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e) => handleImageUpload(e)}
                    accept=".jpg, .jpeg, .png"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Location</label>
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      className="bg-primary flex justify-center items-center text-white px-2 py-1 rounded-md focus:outline-none hover:bg-secondary active:scale-95 transition duration-200"
                      onClick={getLocation}
                    >
                      Auto detect
                    </button>
                    <span>Or</span>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={pincode}
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Pincode"
                        onChange={(e) => {
                          setPincode(e.target.value);
                        }}
                      ></input>
                      <button
                        className="bg-primary flex justify-center items-center text-white px-2 py-1 rounded-md focus:outline-none hover:bg-secondary active:scale-95 transition duration-200"
                        onClick={getPinLocation}
                      >
                        Get Pincode
                      </button>
                    </div>
                  </div>
                  <MapComponent
                    lat={lat}
                    setLat={setLat}
                    lon={lon}
                    setLon={setLon}
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={addNewListing}
                  className="bg-secondary mt-8 flex justify-center mx-auto items-center w-fit text-white px-6 py-3 rounded-md focus:outline-none hover:bg-primary active:scale-95 transition duration-200"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
