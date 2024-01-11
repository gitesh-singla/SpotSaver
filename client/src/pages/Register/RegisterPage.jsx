import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../../Contexts/UserContext";
import { Link, Navigate } from "react-router-dom";

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
    <section className="section-container">
          <div className="max-w-2xl w-full mt-[6%]">
            <h1 className="text-center text-2xl font-bold mb-12">Register</h1>
            <form className="flex flex-col gap-6 text-lg flex-1 justify-center">
            <label className="flex flex-col text-left gap-2 font-semibold text-xl">
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
            <label className="flex flex-col text-left gap-2 font-semibold text-xl">
              Email Address
              <input
                type="email"
                value={email}
                placeholder="Your Email"
                className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label className="flex flex-col text-left gap-2 font-semibold text-xl">
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
            <label className="flex flex-col text-left gap-2 font-semibold text-xl">
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
                className="bg-primary text-white font-semibold text-xl px-8 py-4 self-center rounded-lg hover:scale-105 active:scale-100 shadow-xl transition duration-200"
                onClick={handleRegister}
              >
                Register
              </button>
            </form>
            <div className="text-lg text-gray text-center mt-8">
              Already have an Account?{" "}
              <Link to={"/login"} className="ml-1 text-primary hover:underline">
                Login
              </Link>
            </div>
          </div>
    </section>
  );
}
