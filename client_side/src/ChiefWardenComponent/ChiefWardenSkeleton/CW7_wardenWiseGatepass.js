import designs from "../ChiefWardenStyling/CW6_wardenWiseGatepassCSS";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import moment from 'moment';


const CW7_wardenWiseGatepass = () => {
 const [data, setData] = useState([]);
 const [Filterdata,setFilterData] = useState([]);
 const [refresh,setRefresh] = useState(false);
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
    }
    fetchWardenGpDetails();
    console.log('done');
    let notincluded=['Chief Warden Girls','AutoApprove'];
    const timer=setInterval(fetchWardenGpDetails, 6000); 
    setFilterData(data.filter((item) => !notincluded.includes(item.name)));
    return () => clearInterval(timer);
  }, [refresh]);

  return (
    <div>
    <div className={`${designs.d1}`}>
        
      <div >
      <div>
        <p className={`text-center text-bold text-xl border-b-2 border-black `}>
          {`Warden Wise Gatepass Summary for ${moment().format('MMMM Do YYYY')}`}
          <button className="p-2 ml-2" onClick={async (e)=>{setRefresh(!refresh)}}> 
          <img className='hover:rotate-180 hover:duration-200 h-5 active:translate-y-0.5 'src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png" alt="refresh"/>
          </button>
          </p>
        
      </div>
        <div className={`${designs.d4} p-1 m-0 mt-1 bg-transparent`}>
          <h1 className={`${designs.d5}`}>S.No</h1>
          <h1 className={`${designs.d5}`}>Name</h1>
          <h1 className={`${designs.d5}`}>Pending Requests</h1>
          <h1 className={`${designs.d5}`}>Serviced Requests</h1>
        </div>
      </div>

      <div>
        {Filterdata.map((item, idx) => (
          <div className={`${designs.d4} hover:bg-row_hover_bg hover:-translate-y-1 hover:duration-75 hover:-translate-y-1 hover:duration-75`} key={idx}>
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
