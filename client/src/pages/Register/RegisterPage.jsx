import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../../Contexts/UserContext";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(userContext);

  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  async function handleRegister(dataToSend) {
    try {
      await axios.post("http://localhost:4000/register", dataToSend);
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
        <form
          className="flex flex-col gap-6 text-lg flex-1 justify-center"
          onSubmit={handleSubmit(handleRegister)}
          noValidate
        >
          <label className="flex flex-col text-left gap-2 font-semibold text-xl">
            Name
            <p className="text-sm font-normal text-red-500">
              {errors.name?.message}
            </p>
            <input
              type="text"
              placeholder="Your Name"
              className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
              {...register("name", {
                required: { value: true, message: "Name is required" },
              })}
            />
          </label>
          <label className="flex flex-col text-left gap-2 font-semibold text-xl">
            Email Address
            <p className="text-sm font-normal text-red-500">
              {errors.email?.message}
            </p>
            <input
              type="email"
              placeholder="Your Email"
              className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
            />
          </label>
          <label className="flex flex-col text-left gap-2 font-semibold text-xl">
            Phone No.
            <p className="text-sm font-normal text-red-500">
              {errors.phone?.message}
            </p>
            <input
              type="text"
              placeholder="Your Phone No."
              className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
              {...register("phone", {
                required: { value: true, message: "Phone is required" },
                pattern: {value : /^\d+$/, message: "Enter a valid phone number"}
              })}
            />
          </label>
          <label className="flex flex-col text-left gap-2 font-semibold text-xl">
            Password
            <p className="text-sm font-normal text-red-500">
              {errors.password?.message}
            </p>
            <input
              type="password"
              placeholder="Enter your Password"
              className="min-w-0 border-2 border-zinc-400 rounded-full px-6 py-1 font-medium focus:outline-none"
              {...register("password", {
                required: { value: true, message: "Password is required" },
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
