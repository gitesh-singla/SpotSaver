import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../Contexts/UserContext";
import ListMap from "./ListMap";
import { FadeLoader } from "react-spinners";
import Booking from "./Booking";
import ReviewSection from "./ReviewSection";
import Images from "./Images";
import phoneSVG from "/phone.svg";
import starSVG from "/star.svg";
import stopSVG from "/stop.svg";
import carSVG from "/car.svg";
import clockSVG from "/clock.svg";
import distanceSVG from "/distance.svg";

export default function ListingPage() {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [amenities, setAmenities] = useState(null);

  const { lat, lon, setLat, setLon } = useContext(userContext);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    if (!lat || !lon) {
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
  const urlAmenities = `http://localhost:4000/amenities?id=${id}`;

  async function getData() {
    try {
      const { data } = await axios.get(url);
      const {data: amenitesData} = await axios.get(urlAmenities);
      setAmenities(amenitesData);
      setSpot(data);
    } catch (error) {
      console.log("in getData()", error.message);
    }
  }
  if (!spot) {
    return <FadeLoader color="#2963a3" className="mx-auto mt-48" />;
  }

  if (spot) {
    return (
      <section className="section-container">
        <div className="max-w-content w-full px-6 py-12">
          <h1 className="text-left text-3xl font-bold mb-2">{spot.address}</h1>
          <div className="bg-secondary h-2 mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img src={phoneSVG} alt="#" width={"20px"} />
              <h2>{spot.phone}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <img src={starSVG} alt="#" width={"24px"} />
              <h2>{spot.rating} <a href="#reviews" className="underline">({spot.ratingCount} ratings)</a></h2>
            </div>
          </div>
          <div className="booking-detail gap-4 mt-4 flex mb-8">
            <div className="spot-detail flex-1">
              <div className="flex gap-2 items-center">
                <img src={stopSVG} alt="#" width={"40px"} />
                <h2 className="text-xl">{spot.slots} total spots</h2>
              </div>
              <div className="flex gap-2 items-center">
                <img src={carSVG} alt="#" width={"40px"} />
                <h2 className="text-xl">{spot.type} vehicles allowed</h2>
              </div>
              <h2 className="text-lg max-h-36 h-40 text-ellipsis mt-2">
                {spot.description}
              </h2>
            </div>
            <Booking price={spot.price} />
          </div>
          {spot.images && <Images images={spot.images} isViewerOpen={isViewerOpen} setIsViewerOpen={setIsViewerOpen}/>}
          <h2 className="text-xl font-semibold mb-2">Navigation</h2>
          <div className="h-[2px] bg-gray mb-4"></div>
          <div className="flex gap-4 items-center font-semibold text-lg mb-4">
            <div className="flex gap-2 items-center">
              <img src={clockSVG} alt="#" width={"30px"} />
              <h2>{Math.round(spot.duration / 60)}min</h2>
            </div>
            <div className="flex gap-1 items-center">
              <img src={distanceSVG} alt="#" width={"30px"} />
              <h2>{(spot.distance / 1000).toFixed(2)} Km</h2>
            </div>
          </div>
          {spot && !isViewerOpen && (
            <ListMap
              spot={spot}
              location={[lat, lon]}
              coordinates={spot.coordinates?.map((coord) => {
                return [coord[1], coord[0]];
              })}
              amenities = {amenities}
            />
          )}
          <ReviewSection />
        </div>
      </section>
    );
  }
}
