import profile from "../icons/icon-profile.png";
import designs from "../ChiefWardenStyling/CW4_TableCSS";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";


const CW7_wardenWiseGatepass = () => {
 const [data, setData] = useState([]);
 const [Filterdata,setFilterData] = useState([]);

  useEffect(() => {
    const userToken = Cookies.get("ACCESS_TOKEN");
    const decoded = jwt_decode(userToken);

    async function fetchWardenGpDetails() {
      const response = await fetch(`http://localhost:4000/gatepass/v2/ChiefWarden/wardenGatepassDetails`, {
        headers: {
          Authorization: userToken,
        },
      });
      const result = await response.json();
      setData(result);     
    }
    setFilterData(data.filter((item) => item.name !== 'Chief Warden Girls'));
    fetchWardenGpDetails();
    setInterval(fetchWardenGpDetails, 60000);
  }, []);

  return (
    <div className={`${designs.d1}`}>
        <table>
            <thead>
            <tr className="flex">
                <th className='m-3'>S.No</th>
                <th className='m-3'>Warden Name</th>
                <th className='m-3'>Pending Requests</th>
                <th className='m-3'>Serviced Requests</th>
            </tr>
            </thead>
            <tbody>
                {Filterdata.map((item,idx) => (
                    <tr className="flex" key={idx}>
                        <td className="m-3" key={idx}>{`${idx+1}.`}</td>
                        <td  className='m-3'key={item.name}>{item.name}</td>
                        <td className='m-3' key={item.name}>{item.pending_requests}</td>
                        <td  className='m-3'key={idx.name}>{item.serviced_requests}</td>
                    </tr>                    
                    ))}
            </tbody>
            
        </table>

      {/* <div className={`${designs.d10}`}>
        <div className={`${designs.d11}`}>
          <div className={`${designs.d12}`}>
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Name"
              value={studentName}
              disabled
            />
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Hostel"
              value={studentHostel}
              disabled
            />
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Enrolment"
              value={studentEnrollment}
              disabled
            />
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Contact Number"
              value={studentContact}
              disabled
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CW7_wardenWiseGatepass;
