import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleSearch() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/logInWithGoogle`,
              {
                data: res.data,
              }
            );
            setData(response.data);
            localStorage.setItem("userData", JSON.stringify(response.data));
            navigate("/");
          } catch (error) {
            console.error(error);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  //   const handleSubmit = async () => {
  //     const postData = {
  //       email: profile?.email,
  //       username: profile?.name,
  //       password: profile?.id,
  //       verify: profile?.verified_email,
  //     };
  //     console.log(postData, "postData");
  //     try {
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/logInWithGoogle`,
  //         {
  //           postData,
  //         }
  //       );
  //       setData(response.data);
  //       // localStorage.setItem("userData", JSON.stringify(response.data));
  //       navigate("/");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const logOut = () => {
    console.log("logout");
    googleLogout();
    setUser(null);
    setProfile(null);
    setData(null);
  };

  console.log(data, "data");

  return (
    <button
      type="button"
      onClick={() => {
        login();
      }}
      className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-5 h-5 fill-current"
      >
        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
      </svg>
    </button>
  );
}

export default GoogleSearch;
