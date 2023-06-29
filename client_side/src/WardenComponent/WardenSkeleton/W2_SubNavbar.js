import React from "react";
import designs from "../WardenStyling/W2_SubNavbarCSS"
import { useNavigate } from "react-router-dom";

const WardenSubNavbar = ({tabs}) => {
  const navigate = useNavigate();
  const nav=(e)=>{
    let name=e.target.name
    if(name==="Apply Leave"){
      navigate("/Warden/ApplyLeave")
    }
    if(name==="Warden Leave Management"){
      navigate("/Warden/WardenLeaveManagement")
    }
    if(name in ["Pending Requests","Approved","Cancelled","Visitor Requests","AutoApproved"]){
      navigate("/Warden/home") // update this area with populate Table Later
    }
  }
  return (
    <div className={`${designs.subnav.d1}`}>
      <div className={`${designs.subnav.d2}`}>
        <h1 className={`${designs.subnav.d3}`}>Welcome Warden</h1>
        <div>
        {tabs.map(tab => <button name={tab} key={tab}className=" text-white -ml-1 mr-2 mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm  hover:text-Navbar_bg hover:bg-white " onClick={e=>nav(e)}> {tab}</button>)
        }
      </div>
      </div>
      <div>
        <input type="text" placeholder="Search" className="bg-background p-1.5 text-xs rounded-md mb-4 sm:mb-0"></input>
      </div>
    </div>
  );
};
export default WardenSubNavbar;
