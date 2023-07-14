import designs from "../ChiefWardenStyling/CW6_wardenWiseGatepassCSS";
import React, { useEffect, useState } from "react";
const CW8_NotificationsForm = () => {
 const [api, setApi] = useState('set Notifications api here');
 const[masterGroup,setMasterGroup]=useState('');
 const [text,setText]=useState('');
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
        <p className={`m-2 text-center font-bold border-b-2 border-black`}>{`Create New Notification`}</p>
          <form name='setAutoApproval/BlockedForm' className="p-5" >
           <label htmlFor="masterGroup"> Select Template</label> 
           <select
           id='masterGroup'
              className={`${designs.d13} `}
              onClick={async (e)=>setMasterGroup(e.target.value)}
            >
              <option value='Master Group 1' > Template 1</option>
              <option value='Master Group 2' > Template 2</option>
              <option value='Master Group 3' > Template 3</option>
            </select>
            
            <label className={`${designs.d14}`}>Notification To Display</label>
            <textarea
            rows={8}
            placeholder="Enter Notification here"
            className={`${designs.d13}`}
            />

            <label className={`${designs.d14}`}>To Date Time</label>
            <div className="flex rounded-sm border p-2 bg-Items_bg" >
               <input
               type='datetime-local'
               id='fromDateTime'
               className="w-full bg-transparent"
               />
            </div>
          </form>
        <button className={`bg-Navbar_bg text-background m-2 ml-4 p-2 rounded-md`}>Confirm Done</button>
        </div>
      </div>
    </div>
  );
};

export default CW8_NotificationsForm;
