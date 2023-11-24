import { useContext, useEffect, useState } from "react";
import List from "../../components/List";
import Map from "../../components/Map";
import axios from "axios";
import { userContext } from "../../UserContext";
import { DateContext } from "../../DateContext";
import RangePicker from "./RangeModifier";

function Search() {
  const [spots, setSpots] = useState([]);
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { lat, setLat, lon, setLon } = useContext(userContext);
  const { startTime, endTime } = useContext(DateContext);

  useEffect(() => {
    searchSpots();
  }, [lat, lon, city]);

  useEffect(() => {
    if (!lat || !lon) getLocation();
    coordinatesToCity(lat, lon);
  }, []);
  useEffect(() => {
    console.log(hoveredIndex);
  }, [hoveredIndex]);

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
          console.log(data.address);
          setCity(data.address.state_district.split(" ")[0]);
          return "success";
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
    setSpots(data);
  }

  function sortByDistance() {
    const arr = [...spots].sort((a, b) => {
      return a.distance > b.distance ? 1 : -1;
    });
    setSpots(arr);
  }
  function sortByPrice() {
    const arr = [...spots].sort((a, b) => {
      return a.price > b.price ? 1 : -1;
    });
    setSpots(arr);
  }

  return (
    <>
      <main className="absolute top-57 right-0 left-0 bottom-0 overflow-hidden">
        <div className="Search fixed top-[72px] left-[37px] flex flex-col bg-white rounded-md shadow-sh z-10 m-4">
          {/* //searchCard */}
          <div className="Search-details p-2 px-4 flex felx-col gap-4 items-center justify-center">
            <button
              className="bg-primary p-3 rounded-full"
              onClick={getLocation}
            >
              <img
                className="h-[1.25rem]  flex justify-between "
                src="/location-svg.svg"
                alt=""
              />
            </button>
            <span className="">OR</span>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              name="pincode"
              id="pincode"
              placeholder="Enter Pincode"
              className="border-primary border-2 p-1"
            ></input>
            <button
              className="Search-button bg-[#f35141] p-3 rounded-full shadow-lg"
              onClick={getpinLoaction}
            >
              <img className="h-[1.25rem]" src="/search-svg.svg" alt="" />
            </button>
          </div>
          <RangePicker modifySearch={searchSpots}/>
        </div>
        {/* filter */}
        <div className="filter fixed bottom-0 left-0 z-30 m-[1.25em] block w-[70%]">
          <button className="py-[0.625em] px-[2.5em] rounded-md flex items-center bg-[#2963a3] text-white my-0 mx-auto shadow-sh shadow-lg">
            <img className="h-6" src="filter-svg.svg" />
            <div className="text-2xl pl-[0.25em]">Filter</div>
          </button>
        </div>
        <div className="divide w-full flex">
          <section
            id="map-sec"
            className="fixed top-[57px] right-0 left-0 bottom-[52px] w-full h-full z-0"
          >
            <Map
              spots={spots}
              location={[lat, lon]}
              setHoveredIndex={setHoveredIndex}
              hoveredIndex={hoveredIndex}
            />
          </section>

          <section
            id="list-sec"
            className="w-[450px] h-full fixed top-[57px] right-0 z-10 bg-[#f9f9f9]"
          >
            <header>
              <ul className="flex justify-between p-[1em] z-20 bg-white mt-0 shadow-sh  ">
                <li className="text-xl  text-[#999999]">Sort By:</li>
                <li
                  className="text-xl  text-[#999999] cursor-pointer"
                  onClick={sortByDistance}
                >
                  Distance
                </li>
                <li
                  className="text-xl  text-[#999999] cursor-pointer"
                  onClick={sortByPrice}
                >
                  Price
                </li>
                <li className="text-xl  text-[#999999] cursor-pointer">
                  Reviews
                </li>
              </ul>
            </header>
            <div className="listing-cards overflow-y-auto h-[80%] overflow-x-hidden">
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
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                      index={index}
                    />
                  );
                })}
                {(!spots || spots.length == 0) && <h3>No spots available</h3>}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Search;
