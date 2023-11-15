import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(userContext);

  async function handleRegister(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/register", {
        name,
        email,
        phone,
        password,
      });
      setRedirect(true);
    } catch (error) {
      alert("Registration Failed");
      console.log(error.message);
    }
  }

  if (user || redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="px-8">
      <div className="mx-auto bg-white flex gap-8 p-4 mt-12 rounded-xl max-w-4xl">
        <div className="shrink-0">
          <img className="h-[480px] rounded-xl" src={"login-car.jpg"} alt="%" />
        </div>
        <div className="flex items-center p-8 flex-1">
          <form className="flex flex-col gap-6 text-lg flex-1" onSubmit={handleRegister}>
            <label className="flex flex-col text-left gap-2 font-bold text-xl">
              Name
              <input
                type="text"
                value={name}
                placeholder="Your Name"
                className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label className="flex flex-col text-left gap-2 font-bold text-xl">
              Email Address
              <input
                type="email"
                value={email}
                placeholder="Your Eemail"
                className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label className="flex flex-col text-left gap-2 font-bold text-xl">
              Phone No.
              <input
                type="text"
                value={phone}
                placeholder="Your Phone No."
                className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </label>
            <label className="flex flex-col text-left gap-2 font-bold text-xl">
              Password
              <input
                type="password"
                value={password}
                placeholder="Enter your Password"
                className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <button
              className="bg-primary font-bold text-xl px-8 py-4 self-center rounded-lg hover:scale-105 transition duration-200 shadow-xl"
              // onClick={handleRegister}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
