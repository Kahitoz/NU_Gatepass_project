import React, { useEffect, useState } from "react";
import designs from "../StudentStyling/S3_WidgetsCSS";
import Cookies from "js-cookie";
import { week } from "../StudentGatepassHandler/S1_ParameterConfig";
import { checkBlacklist } from "../StudentGatepassHandler/S1_LocalFixed";

const S3_Widgets = () => {
  const [gatepassStatus, setGatepassStatus] = useState("");
  const [getWeekLimit, setWeekLimit] = useState("");
  const [status, checkStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const accessToken = Cookies.get("ACCESS_TOKEN");

  useEffect(() => {
    const userToken = Cookies.get("ACCESS_TOKEN");

    const fetchData = async () => {
      let config = await week(accessToken);
      var date = config.weekLimit;
      setWeekLimit(date);
    };
    fetchData();

    const statusCheck = async () => {
      let g_Status = await checkBlacklist(accessToken);
      checkStatus(g_Status);
      if (status === false) {
        setStatusMessage("Gatepass is Allowed");
      } else if (status === true) {
        setStatusMessage("Gatepass Blocked");
      } else {
        setStatusMessage("Server Error");
      }
    };
    statusCheck();

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

        if (data.length > 0) {
          const latestGatepass = data[data.length - 1];
          setGatepassStatus(latestGatepass.status);
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
        <div
          className={`items-center justify-center text-center flex flex-col sm:flex-row`}
        >
          <h1 className={`font-bold me-2`}>Local Fixed Gatepass Available:</h1>
          <p>{getWeekLimit}</p>
        </div>
      </div>

      <div className={`${designs.d2}`}>
        <h1 className={`text-green-500 font-bold`}>{statusMessage}</h1>
      </div>

      <div className={`${designs.d2}`}>
        <div
          className={`items-center justify-center text-center flex flex-col sm:flex-row`}
        >
          <h1 className={`font-bold me-2`}>Last Gatepass Status:</h1>
          <p className={`text-blue-700`}>{gatepassStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default S3_Widgets;
