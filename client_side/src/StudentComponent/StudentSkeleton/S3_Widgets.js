import React, { useEffect, useState } from "react";
import designs from "../StudentStyling/S3_WidgetsCSS";
import Cookies from "js-cookie";
import { week } from "../StudentGatepassHandler/S1_ParameterConfig";
import { checkBlacklist } from "../StudentGatepassHandler/S1_LocalFixed";
import { fetchData_GP_used } from "../StudentGatepassHandler/S1_LocalFixed";

const S3_Widgets = () => {
  const [gatepassStatus, setGatepassStatus] = useState("");
  const [getWeekLimit, setWeekLimit] = useState("");
  const [status, checkStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [textColor, setTextColor] = useState("");
  const [numberColor, setNumberColor] = useState("");

  const accessToken = Cookies.get("ACCESS_TOKEN");

  useEffect(() => {
    const fetchData = async () => {
      const userToken = Cookies.get("ACCESS_TOKEN");
      const localFixedUsed = await fetchData_GP_used(userToken);

      let config = await week(accessToken);
      const total = config.weekLimit;
      setWeekLimit(parseInt(total) - parseInt(localFixedUsed));
      let g_Status = await checkBlacklist(accessToken);
      checkStatus(g_Status);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
      statusCheck();
      fetchGatepassStatus();
    }, 1000);

    return () => clearInterval(interval);
  }, [getWeekLimit]);

  const statusCheck = () => {
    if (status === false && getWeekLimit > 0) {
      setStatusMessage("Gate-pass is Allowed");
      setTextColor("text-green-500");
      setNumberColor("text-blue-500");
    } else if (status === true) {
      setStatusMessage("Gatepass Blocked");
      setTextColor("text-red-500");
    } else if (getWeekLimit <= 0) {
      setStatusMessage("Local Fixed Exhausted");
      setTextColor("text-red-500");
      setNumberColor("text-red-500");
    } else {
      setStatusMessage("Server Error");
      setTextColor("text-yellow-500");
    }
  };

  const fetchGatepassStatus = async () => {
    try {
      const accessToken = Cookies.get("ACCESS_TOKEN");

      const response = await fetch(
          "http://127.0.0.1:4000/gatepass/v2/student/recent_gatepass",
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
      );

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const latestGatepassStatus = data[0].status;
        setGatepassStatus(latestGatepassStatus);
      }
    } catch (error) {
      console.error("Error fetching gatepass status:", error);
    }
  };

  return (
      <div className={`${designs.d1}`}>
        <div className={`${designs.d2}`}>
          <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
            <h1 className={`font-bold me-2`}>Local Fixed Gatepass Available:</h1>
            <p className={`font-bold ${numberColor}`}>{getWeekLimit}</p>
          </div>
        </div>

        <div className={designs.d2}>
          <h1 className={`font-bold ${textColor}`}>{statusMessage}</h1>
        </div>

        <div className={`${designs.d2}`}>
          <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
            <h1 className={`font-bold me-2`}>Last Gatepass Status:</h1>
            <p className={`font-bold text-blue-700`}>{gatepassStatus}</p>
          </div>
        </div>
      </div>
  );
};

export default S3_Widgets;
