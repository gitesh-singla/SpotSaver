import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../Contexts/UserContext";

export default function Navbar() {
  const { user } = useContext(userContext);

  const liStyle = "hover:opacity-80 leading-[64px]";

  return (
    <nav className="navbar noselect bg-primary font-bold text-white flex justify-between items-stretch px-[5%] h-16 shadow-md shadow-gray">
      <Link className="text-3xl px-4 leading-[64px]" to={"/"}>SpotSaver</Link>
      <li className="gap-4 hidden md:flex">
        {!user && <Link to={"/login"} className={`${liStyle}`}>Login</Link>}
        {user && <Link to={"/profile"} className={`${liStyle}`}><img src="user.svg" className="w-6 mt-5"/></Link>}
        {user && <Link to={"/myspots"} className={`${liStyle}`}>My Spots</Link>}
        {user && <Link to={"/reservations"} className={`${liStyle}`}>My Reservations</Link>}
        {user && <Link to={"/create-listing"} className={`${liStyle}`}>Add a Spot</Link>}
      </li>
    </nav>
  );
}
