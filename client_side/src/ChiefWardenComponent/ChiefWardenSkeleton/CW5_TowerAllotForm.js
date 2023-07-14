import designs from "../ChiefWardenStyling/CW6_wardenWiseGatepassCSS";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const CW5_AutoApprovedBlockedForm = () => {
 const [api, setApi] = useState('');
 const[masterGroup,setMasterGroup]=useState('');
 const current=useLocation().pathname;
  useEffect(() => {
    if (current==='/ChiefWarden/home/AutoApproved') {
      setApi('set AutoApproved api here')
    }
    else{
      setApi('set Blocked api here')
    }

  }, [current]);

  return (
    <div className={`${designs.d1}`}>
      {/* <div className={`${designs.d2}`}>
        <div className={`${designs.d3}`}>
          <div className={`${designs.d4}`}>
            <div className={`${designs.d7}`}>
              <div className={`${designs.d8}`}>
                <button className={`${designs.d9}`}>Request Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className={`${designs.d10}`}>
        <div  className={`${designs.d12}`}>
          <form name='TowerAllotForm' className="p-5" >
           <label htmlFor="setHostel"> Select Hostel</label> 
           <select
           id='masterGroup'
              className={`${designs.d13} `}
              onClick={async (e)=>setMasterGroup(e.target.value)}
            >
              <option value='hostel 1' > hostel 1</option>
              <option value='hostel 2' > hostel 2</option>
              <option value='hostel 3' > hostel 3</option>
            </select>

            <label htmlFor="setTower"> Select Tower</label> 
           <select
           id='masterGroup'
              className={`${designs.d13} `}
              onClick={async (e)=>setMasterGroup(e.target.value)}
            >
              <option value='hostel 1' > tower 1</option>
              <option value='hostel 2' > tower 2</option>
              <option value='hostel 3' > tower 3</option>
            </select>

            <label htmlFor="setWarden"> select warden</label> 
           <select
           id='masterGroup'
              className={`${designs.d13} `}
              onClick={async (e)=>setMasterGroup(e.target.value)}
            >
              <option value='hostel 1' > Warden 1</option>
              <option value='hostel 2' > Warden 2</option>
              <option value='hostel 3' > Warden 3</option>
            </select>
            </form>
            <button className={`bg-Navbar_bg text-background m-2 ml-6  p-2 px-4 rounded-md`}>Insert</button>
            </div>
            </div>
            </div>
  );
};

export default CW5_AutoApprovedBlockedForm;
