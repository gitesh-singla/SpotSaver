import axios from "axios";
import { useContext } from "react";
import { userContext } from "../../Contexts/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useContext(userContext);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  const navigate = useNavigate();

  function logout() {
    try {
      axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleEdit () {
    navigate("edit-user");
  }

  return (
    <section className="section-container">
      <div className="max-w-content w-full mt-8 border-x-2 border-dark px-8">
        <div className="flex justify-between items-center  mb-8">
          <h1 className="text-2xl font-semibold">Profile:</h1>
          <button className="py-2 px-4 text-lg bg-primary text-white font-semibold rounded hover:bg-secondary active:scale-95 transition duration-200"
          onClick={handleEdit}>Edit</button>
        </div>
        <div className="flex flex-col mb-4">  
          <label className="leading-loose">Email: </label>
          <input
            type="text"
            value={user.email}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
            placeholder="Address"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="leading-loose">Name: </label>
          <input
            type="text"
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
            placeholder="Address"
            value={user.name}
            disabled
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="leading-loose">Phone: </label>
          <input
            type="text"
            value={user.phone}
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
            placeholder="Address"
            disabled
          />
        </div>
        <button
          className="bg-primary px-6 py-2 rounded-lg block mx-auto"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}
