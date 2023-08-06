import Logo from "../StudentComponent/icons/icon-niit.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const O1_skeleton = () => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState({});
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);

    fetch("http://localhost:4000/gatepass/v2/auth/google_JWT", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        googleJWT: response.credential,
      }),
    })
        .then((Response) => Response.json())
        .then((response) => {
          Cookies.set("ACCESS_TOKEN", response.ACCESS_TOKEN);
          const access_token = response.ACCESS_TOKEN;
          const decoded = jwt_decode(access_token);
          setRole(decoded.data.role_id);
        });
  }

  useEffect(() => {

      /* global google */
      google.accounts.id.initialize({
        client_id: "372946592599-u1gj83quodhpdae46ejslj4tto3mn3vn.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });

  }, []);

  useEffect(() => {
    if (user && role) {
      if (role === 1) {
        navigate("/student/home");
      } else if (role === 4) {
        navigate("/admin/dashboard");
      } else if (role === 7) {
        navigate("/bch");
      } else if (role === 5) {
        navigate("/guard");
      } else if (role === 2) {
        navigate("/warden/home");
      } else if (role === 3) {
        navigate("/ChiefWarden/home");
      }
    }
  }, [user, role]);

  return (
      <div className="flex justify-center items-center h-screen">
        <div className="inline-block">
          <div className="flex flex-col justify-center p-10 bg-Items_bg rounded-lg">
            <div className="flex items-center mb-8">
              <img src={Logo} alt="" className="mr-8"></img>
              <h1 className="text-text-2 font-bold text-3xl">NIIT University</h1>
            </div>
            <div className="flex justify-center">
              <div id="signInDiv" className="bg-text-2 p-6 rounded-lg text-white font-bold text-xl"></div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default O1_skeleton;
