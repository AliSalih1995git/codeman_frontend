import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProfile() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const token = user.token;
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setError(error.response.data.message);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/addProfile/${id}`,
        {
          userData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Edit Profile
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              disabled={true}
              id="email"
              type="email"
              value={userData.email}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={userData.username}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-800"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={userData.Address}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) =>
                setUserData({ ...userData, Address: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-800"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={userData.phoneNumber}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) =>
                setUserData({ ...userData, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="education"
              className="block text-sm font-semibold text-gray-800"
            >
              Education
            </label>
            <input
              id="education"
              type="text"
              value={userData.Education}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) =>
                setUserData({ ...userData, Education: e.target.value })
              }
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              type="submit"
            >
              {loading ? "loading..." : "Update"}
            </button>
          </div>
        </form>
        {error && <div className="text-red-800">{error}</div>}
      </div>
    </div>
  );
}

export default EditProfile;
