import React, { useEffect, useState } from "react";
import designs from "../WardenStyling/W2_SubNavbarCSS";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const WardenSubNavbar = ({ tabs }) => {
  const userToken = Cookies.get("ACCESS_TOKEN");
  const decoded = jwt_decode(userToken);
  const email = decoded.data.email_id;
  const [userName, setUserName] = useState("");
  const [selectedTab, setSelectedTab] = useState("Pending Requests");
  let current=useLocation().pathname.split("/")[3];
  current=current?current:"Pending Requests";
  const navigate = useNavigate();


  useEffect(() => {
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
    if (current==="ApprovedCancelled"){
      setSelectedTab("Approved / Cancelled");}
    else if (current==="VisitorRequest"){
      setSelectedTab("Visitor Requests");}
    else if (current==="LeaveManagement"){
      setSelectedTab("Warden Leave Management");}
    else if (current==="ApplyLeave"){
      setSelectedTab("Apply Leave");}
    else if (current==="AutoApproved"){
      setSelectedTab("AutoApproved");}
  }, [current]);

  const nav = async (e) => {
    let name = e.target.name; // Update the selected tab when a button is clicked;
    if (name === "Pending Requests") {
      navigate("/Warden/home");
    } else if (name === "Approved / Cancelled") {
      navigate("/Warden/home/ApprovedCancelled");
    } else if (name === "Visitor Requests") {
      navigate("/Warden/home/VisitorRequest");
    } else if (name === "AutoApproved") {
      navigate("/Warden/home/AutoApproved");
    } else if (name === "Warden Leave Management") {
      navigate("/Warden/Leave/LeaveManagement");
    } else if (name === "Apply Leave") {
      navigate("/Warden/Leave/ApplyLeave");
    }
    return name;
  };

  return (
      <div className={`${designs.subnav.d1}`}>
        <div className={`${designs.subnav.d2}`}>
          <h1 className={`${designs.subnav.d3}`}>Welcome {userName}</h1>
          <div>
            {tabs.map((tab) => (
                <button
                    name={tab}
                    key={tab}
                    className={` -ml-1 mr-2 mt-5 mb-1 pb-0 text-xl text-center p-2 rounded-sm  ${
                        selectedTab === tab ? "bg-white text-Navbar_bg" : "hover:bg-white text-white hover:text-Navbar_bg"
                    }`}
                    onClick={(e) => nav(e)}
                >
                  {tab}
                </button>
            ))}
          </div>
        </div>
      </div>
  );
};

export default WardenSubNavbar;
