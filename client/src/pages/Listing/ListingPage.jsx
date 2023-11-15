import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../UserContext";
import ListMap from "../../components/ListMap";
import { FadeLoader } from "react-spinners";

export default function ListingPage() {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);

  const { lat, lon, setLat, setLon } = useContext(userContext);

  useEffect(() => {
    if(!lat || !lon){
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
    getData();
  }, [lat, lon]);

  const url = `http://localhost:4000/listing?id=${id}&lat=${lat}&lon=${lon}`;

  async function getData() {
    try {
      const { data } = await axios.get(url);
      setSpot(data);
      console.log(data);
    } catch (error) {
      console.log('in getData()', error.message);
    }
  }
  if (!spot) {
    return <FadeLoader color="#2963a3" className="mx-auto mt-48" />;
  }

  if (spot) {
    return (
      <>
        <main className="absolute top-57 right-0 left-0 bottom-0 overflow-hidden">
          {/* filter */}
          <div className="filter fixed bottom-0 left-0 z-30 m-[1.25em] block w-[70%]">
            <button className="py-[0.625em] px-[2.5em] rounded-md flex items-center bg-[#2963a3] text-white my-0 mx-auto shadow-sh shadow-lg">
              <img className="h-6" src="/filter-svg.svg" alt="#" />
              <div className="text-2xl pl-[0.25em]">Filter</div>
            </button>
          </div>
          <div className="divide w-full flex">
            <section
              id="map-sec"
              className="fixed top-[57px] right-0 left-0 bottom-[52px] w-full h-full z-0"
            >
              {spot && (
                <ListMap
                  spot={spot}
                  location={[lat, lon]}
                  coordinates={spot.coordinates?.map((coord) => {
                    return [coord[1], coord[0]];
                  })}
                />
              )}
            </section>

            <section
              id="list-sec"
              className="w-[450px] h-full fixed top-[57px] right-0 z-10 bg-[#f9f9f9] "
            >
              <div className="bg-[#2963a3] h-16 text-white text-2xl text-center leading-[64px] font-bold">
                {spot.address}
              </div>
              <div className="listing-cards font-semibold text-lg overflow-y-auto h-[80%] overflow-x-hidden gap-4 mt-8 flex flex-col pl-4">
                <div className="border-b-4 border-blue-500">
                  Price: Rs 50 / Hour
                </div>
                <div className="border-b-4 border-blue-500">
                  Description:
                  <p>{spot.description}</p>
                </div>
                <div className="border-b-4 border-blue-500">
                  Owner: {spot.name}
                  <div>contact: {spot.phone}</div>
                </div>
                {spot.distance && <div className="border-b-4 border-blue-500">
                  Distance: {(spot.distance/1000).toFixed(2)}Km
                </div>}
                {spot.duration && <div className="border-b-4 border-blue-500">
                  ETA: {(spot.duration / 60).toFixed(2)}min
                </div>}
              </div>
            </section>
          </div>
        </main>
      </>
    );
  }
}
