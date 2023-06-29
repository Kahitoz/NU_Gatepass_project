import React, { useEffect, useState } from "react";
import designs from "../StudentStyling/S4_TableCSS";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import clsx from "clsx";

const S4_table = () => {
  const [gatepassData, setGatepassData] = useState([]);

  useEffect(() => {
    const userToken = Cookies.get("ACCESS_TOKEN");
    const decoded = jwt_decode(userToken);

    async function fetchGatepassData() {
      try {
        const authorization = userToken; // Replace with your own function to retrieve the authorization key from the cookie
        const headers = {
          Authorization: authorization,
          "Content-Type": "application/json",
        };

        const response = await fetch(
          "http://127.0.0.1:4000/gatepass/v2/student/recent_gatepass",
          { headers }
        );
        const data = await response.json();
        setGatepassData(data);
      } catch (error) {
        console.error("Error fetching gatepass data:", error);
      }
    }

    fetchGatepassData();
  }, []);

  function getActionText(status) {
    if (status === "CHECKEDIN" || status === "CHECKEDOUT") {
      return "N/A";
    }
    return "Cancel";
  }

  function getActionColor(status) {
    switch (status) {
      case "CHECKEDIN":
        return "bg-purple-500";
      case "CHECKEDOUT":
        return "bg-yellow-500";
      case "Pending":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  }

  return (
    <div className="bg-background">
      <div>
        <div className={`${designs.d1}`}>
          <div className={`${designs.d2}`}>
            <h1 className={`${designs.d5}`}>Gatepass Type</h1>
            <h1 className={`${designs.d5}`}>Applied Date/Time</h1>
            <h1 className={`${designs.d5}`}>From Date, Time</h1>
            <h1 className={`${designs.d5}`}>Status</h1>
            <h1 className={`${designs.d5}`}>Remarks</h1>
            <h1 className={`${designs.d5}`}>Actions</h1>
          </div>
        </div>

        <div className={`${designs.d3}`}>
          {gatepassData.map((row, index) => (
            <div className={`${designs.d4}`} key={index}>
              <h1 className={`${designs.d5}`}>{row.gatepass_name}</h1>
              <h1 className={`${designs.d5}`}>{row.applied_date}</h1>
              <h1 className={`${designs.d5}`}>{row.from_date}</h1>
              <h1
                className={clsx(
                  `${designs.d5}`,
                  getActionColor(row.status)
                )}
              >
                {row.status}
              </h1>
              <h1 className={`${designs.d5}`}>{row.comments}</h1>
              <h1
                className={
                  `${designs.d5}`}
                  
                
              >
                {getActionText(row.status)}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default S4_table;
