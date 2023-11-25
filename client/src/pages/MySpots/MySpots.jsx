import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SpotInfo from "./SpotInfo";
import { FadeLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import { userContext } from "../../Contexts/UserContext";

export default function MySpots() {
  const [spots, setSpots] = useState([]);
  const [ready, setReady] = useState(false);
  const {user} = useContext(userContext);

  async function getSpots() {
    try {
      const {data} = await axios.get("http://localhost:4000/myspots", {
        withCredentials: true,
      });
      setSpots(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setReady(true);
    }
  }

  useEffect(() => {
    getSpots();
  }, []);

  if(!ready){
    return <FadeLoader color="#2963a3" className="mx-auto mt-48" />
  }

  if(!user){
    return <Navigate to={"/login"} />
  }

  return (
    <div className="mt-8 flex flex-col items-center px-8 gap-4">
      <h1 className="text-2xl font-bold">My Listings:</h1>
      {spots.length > 0 &&
        spots.map((spot) => {
          return <SpotInfo key={spot._id} spot={spot}/>;
        })}
    </div>
  );
}
