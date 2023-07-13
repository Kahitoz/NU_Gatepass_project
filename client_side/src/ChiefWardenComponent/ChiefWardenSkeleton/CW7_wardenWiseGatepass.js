import profile from "../icons/icon-profile.png";
import designs from "../ChiefWardenStyling/CW6_wardenWiseGatepassCSS";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import moment from 'moment';

const CW7_wardenWiseGatepass = () => {
 const [data, setData] = useState([]);
 const [Filterdata,setFilterData] = useState([]);

  useEffect(() => {
    const userToken = Cookies.get("ACCESS_TOKEN");

    async function fetchWardenGpDetails() {
      const response = await fetch(`http://localhost:4000/gatepass/v2/ChiefWarden/wardenGatepassDetails`, {
        headers: {
          Authorization: userToken,
        },
      });
      const result = await response.json();
      setData(result);     
      setFilterData(data.filter((item) => item.name !== 'Chief Warden Girls'));
    }
    fetchWardenGpDetails();
    setInterval(fetchWardenGpDetails, 60000);
  }, []);

  return (
    <div>
    <div className={`${designs.d1}`}>
        
      <div >
      <p className={`text-center text-bold text-xl border-b-2 border-black `}>{`Warden Wise Gatepass for ${moment().format('MMMM Do YYYY')}`}</p>
        <div className={`${designs.d4} p-1 m-0 mt-1 `}>
          <h1 className={`${designs.d5}`}>S.No</h1>
          <h1 className={`${designs.d5}`}>Name</h1>
          <h1 className={`${designs.d5}`}>Pending Requests</h1>
          <h1 className={`${designs.d5}`}>Serviced Requests</h1>
        </div>
      </div>

      <div>
        {Filterdata.map((item, idx) => (
          <div className={`${designs.d4} hover:bg-row_hover_bg`} key={idx}>
            <h1 className={`${designs.d5} `}>{`${idx+1}.`}</h1>
            <h1 className={`${designs.d5} `}>{item.name}</h1>
            <h1 className={`${designs.d5}`}>{item.pending_requests}</h1>
            <h1 className={`${designs.d5}`}>{item.serviced_requests}</h1>
          </div>
        ))}
      </div>
    </div>
</div>
  );
};

export default CW7_wardenWiseGatepass;
