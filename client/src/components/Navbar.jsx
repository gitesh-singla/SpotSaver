import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../UserContext";

export default function Navbar() {
  const { user } = useContext(userContext);
  return (
    <nav className="bg-[#343a40] font-bold text-white flex justify-between items-center">
      <div className="text-3xl px-4">SpotSaver</div>
      <li className="flex gap-5 px-8 py-4">
        <Link to={"/"}>Home</Link>
        {!user && <Link to={"/login"}>Login</Link>}
        {!user && <Link to={"/register"}>Register</Link>}
        {user && <Link to={"/profile"}>{user.name}</Link>}
        <Link to={"/listings"}>Listings</Link>
        <Link to={"/create-listing"}>Add a Spot!</Link>
      </li>
    </nav>
  );
}
