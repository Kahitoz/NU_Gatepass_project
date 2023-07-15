import React, { useState,useEffect } from "react";
import designs from "../ChiefWardenStyling/CW2_SubNavbarCSS"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
const WardenSubNavbar = ({ tabs }) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const nav = (e) => {

    let name = e.target.name
    if (name === "Gatepass Requests") {
      navigate("/ChiefWarden/home")
    }
    if (name === "AutoApproved") {
      navigate("/ChiefWarden/home/AutoApproved")
    }
    if (name === "Blocked") {
      navigate("/ChiefWarden/home/Blocked")
    }
    if (name === "Notifications") {
      navigate("/ChiefWarden/home/Notifications")
    }
    if (name === "Profile Requests") {
      navigate("/ChiefWarden/home/ProfileRequests")
    }
  }
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
  return (
    <div className={`${designs.subnav.d1}`}>
      <div className={`${designs.subnav.d2}`}>
        <h1 className={`${designs.subnav.d3}`}>Welcome {userName}</h1>
        <div>
          {tabs.map(tab => <button name={tab} key={tab} className=" text-white -ml-1 mr-2 mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm  hover:text-Navbar_bg hover:bg-white " onClick={e => nav(e)}> {tab}</button>)
          }
        </div>
      </div>
      {/* <div>
        <input type="text" placeholder="Search" className="bg-background p-1.5 text-xs rounded-md mb-2 mt-2 sm:mb-0 sm:mt-0"></input>
      </div> */}
    </div>
  );
};
export default WardenSubNavbar;
