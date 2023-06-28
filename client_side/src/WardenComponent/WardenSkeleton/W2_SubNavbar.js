import React from "react";
import designs from "../WardenStyling/W2_SubNavbarCSS"
const WardenSubNavbar = () => {
  return (
    <div className={`${designs.subnav.d1}`}>
      <div className={`${designs.subnav.d2}`}>
        <h1 className={`${designs.subnav.d3}`}>Welcome Guard</h1>
        <button className=" text-white -ml-2 mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm  hover:text-Navbar_bg hover:bg-white " onClick={()=>{alert('clicked')}}> Pending Requests</button>
        <button className=" text-white mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm hover:text-Navbar_bg hover:bg-white" onClick={()=>{alert('clicked')}}> Approved</button>
        <button className=" text-white mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm hover:text-Navbar_bg hover:bg-white" onClick={()=>{alert('clicked')}}> Cancelled</button>
        <button className=" text-white mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm hover:text-Navbar_bg hover:bg-white" onClick={()=>{alert('clicked')}}> Visitor Requests</button>
        <button className=" text-white mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm hover:text-Navbar_bg hover:bg-white" onClick={()=>{alert('clicked')}}> AutoApproved</button>

      </div>
      <div>
        <input type="text" placeholder="Search" className="bg-background p-1.5 text-xs rounded-md"></input>
      </div>
    </div>
  );
};
export default WardenSubNavbar;
