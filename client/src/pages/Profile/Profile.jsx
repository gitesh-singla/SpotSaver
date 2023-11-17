import axios from "axios";
import { useContext } from "react";
import { userContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser, ready } = useContext(userContext);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  if (!ready) {
    return (
      <div className="bg-gray h-screen">
        <h2
          className="bg-white inline-block p-8 rounded-xl
           text-lightgray text-xl font-semibold"
        >
          Loading
        </h2>
      </div>
    );
  }

  function logout() {
    try {
      axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center">
          <h2>Username: {user.name}</h2>
          <h2>Email: {user.email}</h2>
          <h2>Phone No: {user.phone}</h2>
      </div>

      <button
        className="bg-primary px-6 py-2 rounded-lg block mx-auto"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
