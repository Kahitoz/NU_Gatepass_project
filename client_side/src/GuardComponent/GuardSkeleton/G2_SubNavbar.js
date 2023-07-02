import React from "react";
import designs from "../GuardStyling/G2_SubNavbarCSS"
import { useState } from "react";

const GuardSubNavbar = ({setSubOption,handleChange}) => {
  
  return (
    <div className={`${designs.subnav.d1}`}>
      <div className={`${designs.subnav.d2}`}>
        <h1 className={`${designs.subnav.d3}`}>Welcome Guard</h1>
        <button name="Check Out" className=" text-white -ml-2 mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm  hover:text-Navbar_bg hover:bg-white " onClick={()=>{setSubOption("Check Out")}}> Check out</button>
        <button name="Check In"className=" text-white mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm hover:text-Navbar_bg hover:bg-white" onClick={()=>{setSubOption("Check In")}}> Check in</button>
      </div>
      <div>
        <input type="text" placeholder="Search" className="bg-background p-1.5 text-xs rounded-md" onchange={(e)=>handleChange(e)}></input>
      </div>
    </div>
  );
};
export default GuardSubNavbar;
