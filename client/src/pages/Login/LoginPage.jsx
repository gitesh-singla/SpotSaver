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
      const { data } = await axios.post(
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
    <section className="section-container">
          <div className="max-w-2xl w-full mt-[6%]">
            <h1 className="text-center text-2xl font-bold mb-12">Login</h1>
            <form className="flex flex-col gap-6 text-lg flex-1 justify-center">
              <label className="flex flex-col text-left gap-2 font-semibold text-xl">
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
              <label className="flex flex-col text-left gap-2  font-semibold text-xl">
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
                className="bg-primary text-white font-semibold text-xl px-8 py-4 self-center rounded-lg hover:scale-105 active:scale-100 shadow-xl transition duration-200"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
            <div className="text-lg text-gray text-center mt-8">
              Dont have an Account?{" "}
              <Link to={"/register"} className="ml-1 text-primary hover:underline">
                Register
              </Link>
            </div>
          </div>
    </section>
  );
}
