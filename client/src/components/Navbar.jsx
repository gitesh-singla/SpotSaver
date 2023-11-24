import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../UserContext";

export default function Navbar() {
  const { user } = useContext(userContext);
  return (
    <nav className="bg-[#343a40] font-bold text-white flex justify-between items-center">
      <Link className="text-3xl px-4" to={"/"}>SpotSaver</Link>
      <li className="flex gap-5 px-8 py-4">
        {!user && <Link to={"/login"}>Login</Link>}
        {user && <Link to={"/profile"}>{user.name}</Link>}
        {user && <Link to={"/myspots"}>My Spots</Link>}
        {user && <Link to={"/reservations"}>My Reservations</Link>}
        {user && <Link to={"/create-listing"}>Add a Spot!</Link>}
      </li>
    </nav>
  );
}
