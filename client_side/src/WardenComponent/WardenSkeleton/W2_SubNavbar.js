import React, { useEffect, useState } from "react";
import designs from "../WardenStyling/W2_SubNavbarCSS";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const WardenSubNavbar = ({ tabs }) => {
  const userToken = Cookies.get("ACCESS_TOKEN");
  const decoded = jwt_decode(userToken);
  const email = decoded.data.email_id;
  const [userName, setUserName] = useState("");
  const [selectedTab, setSelectedTab] = useState(null);
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
  }, []);

  const nav = (e) => {
    let name = e.target.name;
    setSelectedTab(name); // Update the selected tab when a button is clicked

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
                    className={`text-white -ml-1 mr-2 mt-5 mb-0 pb-0 text-xl text-center p-2 rounded-sm hover:text-Navbar_bg ${
                        selectedTab === tab ? "bg-red-500" : "hover:bg-white"
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
