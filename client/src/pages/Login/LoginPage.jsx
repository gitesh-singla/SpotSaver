import { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../../Contexts/UserContext";
import { Link, Navigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(userContext);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const {data} = await axios.post(
        "http://localhost:4000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  }

  if (user || redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="px-8">
      <div className="mx-auto bg-white flex gap-8 p-4 mt-12 rounded-xl max-w-4xl">
        <div className="shrink-0">
          <img className="h-[480px] rounded-xl" src={"login-car.jpg"} alt="%" />
        </div>
        <div className="flex items-center p-8 flex-1 flex-col">
          <form className="flex flex-col gap-6 text-lg flex-1 justify-center">
            <label className="flex flex-col text-left gap-2 font-bold text-xl">
              Email Address
              <input
                type="email"
                placeholder="Your Email"
                className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label className="flex flex-col text-left gap-2  font-bold text-xl">
              Password
              <input
                type="password"
                placeholder="Enter your Password"
                className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <button
              className="bg-primary font-bold text-xl px-8 py-4 self-center rounded-lg hover:scale-105 shadow-xl transition duration-200"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <div className="text-lg">Dont have an Account? <Link to={"/register"} className="ml-1 text-tblue">Register</Link></div>
        </div>
      </div>
    </div>
  );  
}
