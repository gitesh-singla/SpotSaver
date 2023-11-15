import { useEffect, useState } from "react";
import List from "../../components/List";
import Map from "../../components/Map";
import axios from "axios";

function Search() {
  const [spots, setSpots] = useState([]);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState(0);

  useEffect(() => {
    searchSpots()
  }, [city])

  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          const msg = await coordinatesToCity(
            position.coords.latitude,
            position.coords.longitude
          );
          console.log(msg);
          console.log(city);  
        },
        function (error) {
          console.log(error);
        }
      );
    }
  }

  async function coordinatesToCity(lat, lon) {
    let response;
    try {
      response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
    } catch (error) {
      console.log(error.message);
    }
    if (response.status === 200) {
      const data = response.data;
      if (data.address && data.address.city) {
        setCity(data.address.city);
        return "success";
      } else {
        throw new Error("Pincode not found");
      }
    } else {
      throw new Error("Data not retreived");
    }
  }

  async function getpinLoaction() {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${pincode}`
    );
    setLat(+data[0].lat);
    setLon(+data[0].lon);
    await coordinatesToCity(data[0].lat, data[0].lon);
  }

  async function searchSpots() {
    console.log("searching");
    const { data } = await axios.get(
      `http://localhost:4000/listings?lat=${lat}&lon=${lon}&city=${city}`
    );
    setSpots(data);
    console.log(data);
  }

  return (
    <div className="mt-8 flex flex-col">
      <div className="flex items-center gap-12 self-center">
        <button className="bg-gray p-2 text-white" onClick={getLocation}>
          Get Location
        </button>
        <h1 className="text-white">OR</h1>
        <div>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            name="pincode"
            id="pincode"
            placeholder="Enter Pincode"
            className="border-primary border-2 p-1"
          />
          <button className="bg-gray p-2 ml-4 text-white" onClick={getpinLoaction}>
            Go
          </button>
        </div>
      </div>
      <div className=" mx-auto mt-8 mb-16 h-screen w-3/4 rounded-lg border-gray border-4 shadow-gray shadow-md flex-row">
        <div className="flex h-full p-4">
          <Map spots={spots} location={[lat, lon]}/>
          <div className="w-2/6 flex-col">
            {spots &&
              spots.map((spot) => {
                return (
                  <List
                    address={spot.address}
                    distance={spot.distance}
                    key={spot._id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
