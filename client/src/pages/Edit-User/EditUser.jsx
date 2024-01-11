import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Contexts/UserContext";

export default function EditUser() {
  const { user, setUser } = useContext(userContext);

  const [changePassword, setChangePassword] = useState(false);
  const [nameEdit, setNameEdit] = useState(user.name);
  const [phoneEdit, setPhoneEdit] = useState(user.phone);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSave() {
    // try {
    //     await axios.patch("http://localhost:4000/edituser", {name: nameEdit, phone: phoneEdit}, {withCredentials: true});
    // } catch (error) {
    //     console.log(error.data);
    // }
    console.log("handleSave() in editUser");
  }

  function togglePasswordChange() {
    setChangePassword(!changePassword);
  }

  return (
    <section className="section-container">
      <div className="max-w-content w-full mt-8 border-x-2 border-dark px-8">
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
                value={nameEdit}
                onChange={(e) => {
                  setNameEdit(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">Phone: </label>
              <input
                type="text"
                value={phoneEdit}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Address"
                onChange={(e) => {
                  setPhoneEdit(e.target.value);
                }}
              />
            </div>
            <button className="py-2 px-4 text-lg bg-secondary text-white font-semibold rounded hover:bg-primary active:scale-95 transition duration-200" onClick={togglePasswordChange}>
              Change Password
            </button>
          </>
        )}

        {changePassword && (
          <>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">Current Password: </label>
              <input
                type="password"
                value={oldPassword}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Address"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">New Password: </label>
              <input
                type="password"
                value={newPassword}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Address"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="leading-loose">Confirm Password: </label>
              <input
                type="password"
                value={confirmPassword}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-dark disabled:text-gray"
                placeholder="Address"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <button className="py-2 px-4 text-lg bg-secondary text-white font-semibold rounded hover:bg-primary active:scale-95 transition duration-200" onClick={togglePasswordChange}>
              Go Back
            </button>
          </>
        )}
      </div>
    </section>
  );
}
