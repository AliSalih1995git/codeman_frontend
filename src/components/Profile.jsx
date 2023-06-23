import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const id = user.others._id;
  const token = user.token;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/getProfile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchUser();
  }, [id]);
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-1/2 p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Profile
        </h1>
        <div className="mt-6">
          <div className="flex  items-center mb-2">
            <label className="text-sm font-semibold text-gray-800 uppercase">
              Name:
            </label>
            <span className="ml-auto">{userData.username}</span>
          </div>
          <div className="flex  items-center mb-2">
            <label className="text-sm font-semibold text-gray-800 uppercase">
              Email:
            </label>
            <span className="ml-auto">{userData.email}</span>
          </div>
          <div className="flex items-center mb-2">
            <label className="text-sm font-semibold text-gray-800 uppercase">
              Address:
            </label>
            <span className="ml-auto">{userData.Address}</span>
          </div>
          <div className="flex items-center mb-2">
            <label className="text-sm font-semibold text-gray-800 uppercase">
              phoneNumber:
            </label>
            <span className="ml-auto">{userData.phoneNumber}</span>
          </div>
          <div className="flex items-center mb-2">
            <label className="text-sm font-semibold text-gray-800 uppercase">
              Education:
            </label>
            <span className="ml-auto">{userData.Education}</span>
          </div>

          <div className="mt-6">
            <Link to={`/editProfile/${id}`}>
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                type="submit"
              >
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
