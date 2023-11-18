import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../UserContext";
import { Navigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import ReservationInfo from "./ReservationInfo";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [ready, setReady] = useState(false);
  const { user } = useContext(userContext);

  async function getReservations() {
    try {
      const { data } = await axios.get("http://localhost:4000/reservations", {
        withCredentials: true,
      });
      setReservations(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setReady(true);
    }
  }

  useEffect(() =>{
    getReservations();
  }, [])

  if (!ready) {
    return <FadeLoader color="#2963a3" className="mx-auto mt-48" />;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="mt-8 flex flex-col items-center px-8 gap-4">
      <h1 className="text-2xl font-bold">My Reservations:</h1>
      {reservations.length > 0 &&
        reservations.map((reservation) => {
          return <ReservationInfo key={reservation._id} reservation={reservation} />;
        })}
    </div>
  );
}
