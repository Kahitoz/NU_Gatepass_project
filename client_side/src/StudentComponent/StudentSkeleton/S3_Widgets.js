import React, { useEffect, useState } from "react";
import designs from "../StudentStyling/S3_WidgetsCSS";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const S3_Widgets = () => {
  const [gatepassData, setGatepassData] = useState([]);
  const [gatepassStatus, setGatepassStatus] = useState("");
  const [latestAppliedDate, setLatestAppliedDate] = useState("");
  const [latestAppliedTime, setLatestAppliedTime] = useState("");

  useEffect(() => {
    const userToken = Cookies.get("ACCESS_TOKEN");
    const decoded = jwt_decode(userToken);

    async function fetchGatepassData() {
      try {
        const authorization = userToken;
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

        if (data.length > 0) {
          const latestGatepass = data[data.length - 1];
          setGatepassStatus(latestGatepass.status);
          setLatestAppliedDate(latestGatepass.applied_date);
          setLatestAppliedTime(latestGatepass.applied_time);
        }
      } catch (error) {
        console.error("Error fetching gatepass data:", error);
      }
    }

    fetchGatepassData();
  }, []);

  return (
    <div className={`${designs.d1}`}>
      <div className={`${designs.d2}`}>
        <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
          <h1 className={`font-bold me-2`}>Local Fixed Gatepass Available:</h1>
          <p>3</p>
        </div>
      </div>

      <div className={`${designs.d2}`}>
        <h1 className={`text-green-500 font-bold`}>Gatepass Allowed</h1>
      </div>

      <div className={`${designs.d2}`}>
        <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
          <h1 className={`font-bold me-2`}>Last Gatepass Status:</h1>
          <p className={`text-blue-700`}>{gatepassStatus}</p>
        </div>
      
      </div>
    </div>
  );
};

export default S3_Widgets;
