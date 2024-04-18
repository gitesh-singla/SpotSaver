import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Contexts/UserContext";
import { Navigate } from "react-router-dom";
import validateInput from "./validateInput";

export default function EditUser() {
  const { user } = useContext(userContext);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  const [changePassword, setChangePassword] = useState(false);
  const [nameEdit, setNameEdit] = useState(user.name);
  const [phoneEdit, setPhoneEdit] = useState(user.phone);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  async function handleSave() {
    let formData = {
      name: nameEdit,
      phone: phoneEdit,
      oldPassword,
      newPassword,
      confirmPassword,
    };
    let validate = validateInput(formData);
    setErrors(validate);

    try {
      if (Object.keys(validate).length != 0) throw "Invalid input";

      if (!changePassword) {
        if (nameEdit == "" || phoneEdit == "") throw "Name or Phone missing!";
        await axios.patch(
          "/edituser",
          { name: nameEdit, phone: phoneEdit },
          { withCredentials: true }
        );
        window.location.reload();
      }
      if (changePassword) {
        if (newPassword != confirmPassword) throw "Passwords dont match!";
        await axios.patch(
          "http://localhost:4000/changepassword",
          { oldPassword, newPassword },
          { withCredentials: true }
        );
        window.location.reload();
      }
    } catch (error) {
      if (error.response.data == "incorrect password") {
        setErrors({ oldPassword: error.response.data });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
      console.log(error, "handleSave() in editUser");
    }
  }

  function togglePasswordChange() {
    setChangePassword(!changePassword);
  }

  return (
    <section className="section-container">
      <div className="max-w-content w-full mt-8 border-x-2 border-dark px-8 mb-8">
        <div className="flex justify-between items-center  mb-8">
          <h1 className="text-2xl font-semibold">Edit: </h1>
          <button
            className="py-2 px-4 text-lg bg-primary text-white font-semibold rounded hover:bg-secondary active:scale-95 transition duration-200"
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        {!changePassword && (
          <>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">Email: </label>
              <input
                type="text"
                value={user.email}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Email"
                disabled
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">Name: </label>
              <p className="text-sm font-normal text-red-500">{errors.name}</p>
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Name"
                value={nameEdit}
                onChange={(e) => {
                  let str = e.target.value;
                  if (str == "" || str.match(/^ *$/) !== null) {
                    setErrors({
                      ...errors,
                      name: "Name can't be empty",
                    });
                  } else {
                    const newError = { ...errors };
                    delete newError.name;
                    setErrors(newError);
                  }
                  setNameEdit(str);
                }}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">Phone: </label>
              <p className="text-sm font-normal text-red-500">
                {errors.phoneEdit}
              </p>
              <input
                type="text"
                value={phoneEdit}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Phone"
                onChange={(e) => {
                  let str = e.target.value;
                  if (str.match(/^\d+$/) == null) {
                    setErrors({
                      ...errors,
                      phoneEdit: "Enter a valid phone number",
                    });
                  } else {
                    const newError = { ...errors };
                    delete newError.phoneEdit;
                    setErrors(newError);
                  }
                  setPhoneEdit(str);
                }}
              />
            </div>
            <button
              className="py-2 px-4 text-lg bg-secondary text-white font-semibold rounded hover:bg-primary active:scale-95 transition duration-200"
              onClick={togglePasswordChange}
            >
              Change Password
            </button>
          </>
        )}

        {changePassword && (
          <>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">Current Password: </label>
              <p className="text-sm font-normal text-red-500">
                {errors.oldPassword}
              </p>
              <input
                type="password"
                value={oldPassword}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Current Password"
                onChange={(e) => {
                  let str = e.target.value;
                  setErrors((prev) => {
                    delete prev.oldPassword;
                    return prev;
                  });
                  setOldPassword(str);
                }}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">New Password: </label>
              <p className="text-sm font-normal text-red-500">
                {errors.newPassword}
              </p>
              <input
                type="password"
                value={newPassword}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="New Password"
                onChange={(e) => {
                  let str = e.target.value;
                  if (str.length < 8) {
                    setErrors({
                      ...errors,
                      newPassword: "Password must be atleast 8 characters",
                    });
                  } else {
                    const newError = { ...errors };
                    delete newError.newPassword;
                    setErrors(newError);
                  }
                  setNewPassword(str);
                }}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">Confirm Password: </label>
              <p className="text-sm font-normal text-red-500">
                {errors.confirmPassword}
              </p>
              <input
                type="password"
                value={confirmPassword}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Confirm Pasasword"
                onChange={(e) => {
                  let str = e.target.value;
                  if (str != newPassword) {
                    setErrors({
                      ...errors,
                      confirmPassword: "Passwords do not match",
                    });
                  } else {
                    const newError = { ...errors };
                    delete newError.confirmPassword;
                    setErrors(newError);
                  }
                  setConfirmPassword(str);
                }}
              />
            </div>
            <button
              className="py-2 px-4 text-lg bg-secondary text-white font-semibold rounded hover:bg-primary active:scale-95 transition duration-200"
              onClick={togglePasswordChange}
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </section>
  );
}
