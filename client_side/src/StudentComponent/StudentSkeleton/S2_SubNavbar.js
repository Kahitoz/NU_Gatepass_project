import React, { useEffect, useState } from "react";
import Clouds from "../icons/icon-clouds.png";
import designs from "../StudentStyling/S2_SubNavbarCSS"
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
const StudentSubNavbar = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    
    const userToken = Cookies.get("ACCESS_TOKEN");
    const decoded = jwt_decode(userToken);
    const email = decoded.data.email_id;
    
    async function fetchUserDetails() {
      const response = await fetch(`http://127.0.0.1:4000/gatepass/v2/user_details/${email}`, {
        headers: {
          Authorization: userToken,
        },
      });
      const data = await response.json();
      setUserName(data.name);
    }

    fetchUserDetails();
  }, []);

  return (
    <div className={`${designs.subnav.d1}`}>

      <div className={`${designs.subnav.d2}`}>
        <h1 className={`${designs.subnav.d3}`}>Welcome, {userName}</h1>
        <div className={`${designs.subnav.d4} `}>
          <img src={Clouds} alt="message" className={`${designs.subnav.d5}`}></img>
          <p className={`${designs.subnav.d6}`}>Weather message</p>
        </div>
      </div>

      <div className={`${designs.subnav.d7}`}>
        <h1 className={`${designs.subnav.d8}`}>Notification</h1>
        <p className={`${designs.subnav.d9}`}>No New Notificaion for display</p>
      </div>
    </div>
  );
};
export default StudentSubNavbar;
