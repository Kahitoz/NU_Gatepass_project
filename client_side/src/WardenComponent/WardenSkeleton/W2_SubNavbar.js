import React from "react";
import designs from "../WardenStyling/W2_SubNavbarCSS"
const WardenSubNavbar = ({tabs}) => {
  return (
    <div className={`${designs.subnav.d1}`}>
      <div className={`${designs.subnav.d2}`}>
        <h1 className={`${designs.subnav.d3}`}>Welcome Warden</h1>
        <div>
        {tabs.map(tab => <button className=" text-white -ml-2 mt-5 mb-0 pb-0 text-xs text-center p-2 rounded-sm  hover:text-Navbar_bg hover:bg-white " onClick={()=>{alert('clicked')}}> {tab}</button>)
        }
      </div>
      </div>
      <div>
        <input type="text" placeholder="Search" className="bg-background p-1.5 text-xs rounded-md"></input>
      </div>
    </div>
  );
};
export default WardenSubNavbar;
