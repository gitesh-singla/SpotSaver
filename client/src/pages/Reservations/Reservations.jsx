import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Contexts/UserContext";
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
      const dateSorted = data.sort((a, b) => {
        return a.start > b.start;
      })
      setReservations(dateSorted)
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
    <section className="section-container">
      <div className="pt-8 flex flex-col items-center px-8 gap-4 max-w-content w-full my-4">
        <h1 className="text-2xl text-gray font-bold">Reservations:</h1>
        {reservations.length > 0 &&
          reservations.map((reservation) => {
            return <ReservationInfo key={reservation._id} reservation={reservation} />;
          })}
      </div>
    </section>
  );
}
