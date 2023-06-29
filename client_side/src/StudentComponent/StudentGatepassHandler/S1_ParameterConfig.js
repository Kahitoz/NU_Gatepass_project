import React, { useEffect, useState } from "react";
import S1_LocalFixed from "./S1_LocalFixed";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode"

const S1_ParameterConfig = () => {
  const [weekLimit, setWeekLimit] = useState(0);
  const [departureTime, setDepartureTime] = useState("00:00:00");
  const [arrivalTime, setarrivalTime] = useState("00:00:00");
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const decoded = jwt_decode(accessToken);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/gatepass/v2/admin/parameter_config", {
      headers: {
        Authorization: accessToken,
      },
    })
      .then((response) => response.json())
      .then((text) => {
        setWeekLimit(text[0]["value"]);
        setDepartureTime(text[1]["value"]);
        setarrivalTime(text[2]["value"]);
      });
  }, []);

  return (
    <div className="admin">
     
      <div className="adminContainer">
      
        <div className="listContainer">
          <div className="listTitle">Local Fixed Gatepass</div>

          <S1_LocalFixed
            departureTime={departureTime}
            arrivalTime={arrivalTime}
            weekLimit={weekLimit}
          />
        </div>
      </div>
    </div>
  );
}

export default S1_ParameterConfig;
