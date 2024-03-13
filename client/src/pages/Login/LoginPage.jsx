import { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../../Contexts/UserContext";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(userContext);

  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  async function handleLogin(dataToSend) {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        dataToSend,
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
        <form
          className="flex flex-col gap-6 text-lg flex-1 justify-center"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
        >
          <label className="flex flex-col text-left gap-1 font-semibold text-xl">
            Email Address
            <p className="text-sm font-normal text-red-500">{errors.email?.message}</p>
            <input
              type="email"
              placeholder="Your Email"
              className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
              {...register("email", {
                required: { value: true, message: "Please enter your email" },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email",
                },
              })}
            />
          </label>
          <label className="flex flex-col text-left gap-1  font-semibold text-xl">
            Password
            <p className="text-sm font-normal text-red-500">{errors.password?.message}</p>
            <input
              type="password"
              placeholder="Enter your Password"
              className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
              {...register("password", {
                required: {
                  value: true,
                  message: "Please enter your password"
                },
                minLength: {
                  value: 8,
                  message: "Password should be atleast 8 characters",
                },
              })}
            />
          </label>
          <button
            className="bg-primary text-white font-semibold text-xl px-8 py-4 self-center rounded-lg hover:scale-105 active:scale-100 shadow-xl transition duration-200"
            type="submit"
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
