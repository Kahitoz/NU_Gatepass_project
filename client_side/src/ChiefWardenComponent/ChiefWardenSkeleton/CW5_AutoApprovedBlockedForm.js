import designs from "../ChiefWardenStyling/CW6_wardenWiseGatepassCSS";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const CW5_AutoApprovedBlockedForm = () => {
 const [api, setApi] = useState('');
 const[masterGroup,setMasterGroup]=useState('');
 const [text,setText]=useState('');
 const current=useLocation().pathname;
  useEffect(() => {
    if (current==='/ChiefWarden/home/AutoApproved') {
      setApi('set AutoApproved api here')
      setText('Auto Approved')
    }
    else{
      setApi('set Blocked api here')
      setText('Blocked')
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
        <p className={`m-2 text-center font-bold border-b-2 border-black`}>{`Create New ${text} Request`}</p>
          <form name='setAutoApproval/BlockedForm' className="p-5" >
           <label htmlFor="masterGroup"> Master Group</label> 
           <select
           id='masterGroup'
              className={`${designs.d13} `}
              onClick={async (e)=>setMasterGroup(e.target.value)}
            >
              <option value='Master Group 1' > Master Group 1</option>
              <option value='Master Group 2' > Master Group 2</option>
              <option value='Master Group 3' > Master Group 3</option>
            </select>
            <label className={`${designs.d14}`}>Group </label>
            <div className="flex rounded-sm border p-2 bg-Items_bg ">
            <div >
            <input
              type="checkbox"
              id='groupCheckbox'
              className={`m-1`}
              value='group1'
            /><label> group 1</label>
            </div>
            <div>
            <input
              type="checkbox"
              id='groupCheckbox'
              className={`m-1`}
              value='group1'
            /> <label> group 2</label>
            </div>
            <div>
            <input
              type="checkbox"
              id='groupCheckbox'
              className={`m-1`}
              value='group1'
            /><label> group 3</label>
            </div>
            <div>
            <input
              type="checkbox"
              id='groupCheckbox'
              className={`m-1`}
              value='group4'
            /><label> group 4</label>
            </div>
            </div>


            <label className={`${designs.d14}`}> Sub Group </label>
            <div className="flex rounded-sm border p-2 bg-Items_bg ">
            <div >
            <input
              type="checkbox"
              id='SubgroupCheckbox'
              className={`m-1`}
              value='group1'
            />Subgroup 1
            </div>
            <div>
            <input
              type="checkbox"
              id='SubgroupCheckbox'
              className={`m-1`}
              value='group1'
            /> Subgroup 2
            </div>
            <div>
            <input
              type="checkbox"
              id='SubgroupCheckbox'
              className={`m-1`}
              value='group1'
            /> Subgroup 3
            </div>
            <div>
            <input
              type="checkbox"
              id='SubgroupCheckbox'
              className={`m-1`}
              value='group4'
            />Subgroup 4
            </div>
            </div>

              <label className={`${designs.d14}`}>From Date Time</label>
            <div className="flex rounded-sm border p-2 bg-Items_bg" >
               <input
               type='datetime-local'
               id='fromDateTime'
               className="w-full bg-transparent"
               />
            </div>

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

export default CW5_AutoApprovedBlockedForm;
