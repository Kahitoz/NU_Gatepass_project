import React, { useEffect, useState } from "react";
import Clouds from "../icons/icon-clouds.png";
import designs from "../StudentStyling/S2_SubNavbarCSS";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const StudentSubNavbar = () => {
  const [userName, setUserName] = useState("");
  const [weatherMessage, setWeatherMessage] = useState("");

  useEffect(() => {
    const userToken = Cookies.get("ACCESS_TOKEN");
    const decoded = jwt_decode(userToken);
    const email = decoded.data.email_id;

    async function fetchUserDetails() {
      const response = await fetch(
        `http://127.0.0.1:4000/gatepass/v2/user_details/${email}`,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      const data = await response.json();
      setUserName(data.name);
    }

    fetchUserDetails();
  }, []);

  useEffect(() => {
    async function fetchWeatherData() {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=27.99&longitude=76.39&hourly=temperature_2m,rain"
      );
      const data = await response.json();

    
      const temperature = data.hourly.temperature_2m[0].value;
      const rain = data.hourly.rain[0].value;

      
      if (temperature >= 35) {
        setWeatherMessage("It's too hot. Stay indoors!");
      } else if (temperature <= 10) {
        setWeatherMessage("It's too cold. Stay cozy at hostel!");
      } else if (rain >= 5) {
        setWeatherMessage("It's raining. Don't forget your umbrella!");
      } else {
        setWeatherMessage("Weather looks good. Enjoy your day outside!");
      }
    }

    fetchWeatherData();
  }, []);

  return (
    <div className={`${designs.subnav.d1}`}>
      <div className={`${designs.subnav.d2}`}>
        <h1 className={`${designs.subnav.d3}`}>Welcome, {userName}</h1>
        <div className={`${designs.subnav.d4} `}>
          <img
            src={Clouds}
            alt="message"
            className={`${designs.subnav.d5}`}
          ></img>
          <p className={`${designs.subnav.d6}`}>{weatherMessage}</p>
        </div>
      </div>

      <div className={`${designs.subnav.d7}`}>
        <h1 className={`${designs.subnav.d8}`}>Notification</h1>
        <p className={`${designs.subnav.d9}`}>No New Notification for display</p>
      </div>
    </div>
  );
};

export default StudentSubNavbar;
