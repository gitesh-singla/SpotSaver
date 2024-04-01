import { useContext, useEffect, useState } from "react";
import List from "./List";
import Map from "./Map";
import axios from "axios";
import { userContext } from "../../Contexts/UserContext";
import { DateContext } from "../../Contexts/DateContext";
import RangeModifier from "./RangeModifier";

function Listings() {
  const [spots, setSpots] = useState([]);
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState();
  const [pinSearch, setPinSearch] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sortCriteria, setSortCritera] = useState('d');

  const { lat, setLat, lon, setLon } = useContext(userContext);
  const { startTime, endTime } = useContext(DateContext);

  useEffect(() => {
    searchSpots();
  }, [lat, lon, city, pinSearch]);

  useEffect(() => {
    if (!lat || !lon) getLocation();
    coordinatesToCity(lat, lon); // to set city when page remounts
  }, []);


  function sortByDistance(spots) {
    const arr = [...spots].sort((a, b) => {
      return a.distance > b.distance ? 1 : -1;
    });
    setSpots(arr);
  }
  function sortByPrice(spots) {
    const arr = [...spots].sort((a, b) => {
      return a.price > b.price ? 1 : -1;
    });
    setSpots(arr);
  }
  function sortByRating(spots) {
    const arr = [...spots].sort((a, b) => {
      return a.rating < b.rating ? 1 : -1;
    });
    setSpots(arr);
  }

  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
            await coordinatesToCity(
              position.coords.latitude,
              position.coords.longitude
            );
            console.log(city);
          } catch (error) {
            console.log("in getLocation", error.message);
          }
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
      if (response.status === 200) {
        const data = response.data;
        if (data.address) {
          setCity(data.address.state_district.split(" ")[0]);
        } else {
          throw new Error("Pincode not found");
        }
      } else {
        throw new Error("Data not retreived");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getpinLoaction() {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${pincode}`
    );
    setLat(+data[0].lat);
    setLon(+data[0].lon);
    await coordinatesToCity(data[0].lat, data[0].lon);
    setPinSearch(!pinSearch);
  }

  async function searchSpots() {
    console.log("searching");
    let start = new Date(startTime);
    start = start.toISOString();
    let end = new Date(endTime);
    end = end.toISOString();
    const { data } = await axios.get(
      `http://localhost:4000/listings?lat=${lat}&lon=${lon}&city=${city}&startTime=${start}&endTime=${end}`
    );
    if(sortCriteria == 'd') sortByDistance(data);
    if(sortCriteria == 'p') sortByPrice(data);
    if(sortCriteria == 'r') sortByRating(data);
  }

  function handleKeyPincode(event) {
    if (event.key == "Enter") getpinLoaction();
  }

  return (
    <div className="flex-1 flex items-stretch" style={{maxHeight: "calc(100vh - 124px)"}}>
      <div id="map-sec" className="flex-1 relative">
        <Map
          spots={spots}
          location={[lat, lon]}
          setHoveredIndex={setHoveredIndex}
          hoveredIndex={hoveredIndex}
        />
        <div className="Search absolute top-2 left-14 flex flex-col bg-primary rounded-md shadow-sh z-10 text-white">
          <RangeModifier modifySearch={searchSpots} />
          <div className="Search-details p-2 px-4 flex felx-col gap-4 items-center justify-center">
            <button
              className="bg-white p-2 rounded-full hover:scale-105 active:scale-100"
              onClick={getLocation}
            >
              <img
                className="h-[1.25rem]  flex justify-between "
                src="/location-svg.svg"
                alt="#"
              />
            </button>
            <span className="text-base">Or</span>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              onKeyDown={handleKeyPincode}
              name="pincode"
              id="pincode"
              placeholder="Enter Pincode"
              className="py-1 px-2 outline-none text-dark rounded-lg min-2-0 w-32"
            ></input>
            <button
              className="Search-button bg-white p-2 rounded-full shadow-lg hover:scale-105 active:scale-100"
              onClick={getpinLoaction}
            >
              <img className="h-[1.25rem]" src="/search-svg.svg" alt="#" />
            </button>
          </div>
        </div>
      </div>

      <div id="list-sec" className="max-w-md min-w-[400px] flex-1 max-h-full">
        <ul className="flex justify-around gap-4 p-2 bg-white shadow-sh">
          <li
            className={`text-xl cursor-pointer ${sortCriteria == 'd' ? "text-gray" : "text-lightgray"}`}
            onClick={() => {
              setSortCritera('d');
              sortByDistance(spots);
            }}
          >
            Distance
          </li>
          <li
            className={`text-xl cursor-pointer ${sortCriteria == 'p' ? "text-gray" : "text-lightgray"}`}
            onClick={() => {
              setSortCritera('p');
              sortByPrice(spots);
            }}
          >
            Price
          </li>
          <li
            className={`text-xl cursor-pointer ${sortCriteria == 'r' ? "text-gray" : "text-lightgray"}`}
            onClick={() => {
              setSortCritera('r');
              sortByRating(spots);
            }}
          >
            Rating
          </li>
        </ul>
        <div className="listing-cards overflow-y-auto p-4" style={{maxHeight: "calc(100% - 44px)"}}>
          {spots &&
            spots.map((spot, index) => {
              return (
                <List
                  address={spot.address}
                  distance={spot.distance}
                  slots={spot.slots}
                  _id={spot._id}
                  key={spot._id}
                  price={spot.price}
                  rating={spot.rating}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  index={index}
                />
              );
            })}
          {(!spots || spots.length == 0) && <h3 className="text-center text-lightgray">No spots available</h3>}
        </div>
      </div>
    </div>
  );
}

export default Listings;
