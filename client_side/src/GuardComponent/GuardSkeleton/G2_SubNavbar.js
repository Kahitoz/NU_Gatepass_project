import React from "react";
import designs from "../GuardStyling/G2_SubNavbarCSS"
import { useState } from "react";

const GuardSubNavbar = ({setSubOption}) => {
  
  return (
    <div className={`${designs.subnav.d1}`}>
      <div className={`${designs.subnav.d2}`}>
        <h1 className={`${designs.subnav.d3}`}>Welcome Guard</h1>
        <button name="checkout" className=" text-white -ml-2 mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm  hover:text-Navbar_bg hover:bg-white " onClick={()=>{setSubOption("checkout")}}> Check out</button>
        <button name="checkin"className=" text-white mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm hover:text-Navbar_bg hover:bg-white" onClick={()=>{setSubOption("checkin")}}> Check in</button>
      </div>
      <div>
        <input type="text" placeholder="Search" className="bg-background p-1.5 text-xs rounded-md"></input>
      </div>
    </div>
  );
};
export default GuardSubNavbar;
