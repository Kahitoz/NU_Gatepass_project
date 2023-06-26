import React from "react";
import designs from "../GuardStyling/G2_SubNavbarCSS"
const GuardSubNavbar = () => {
  return (
    <div className={`${designs.subnav.d1}`}>
      <div className={`${designs.subnav.d2}`}>
        <h1 className={`${designs.subnav.d3}`}>Welcome Guard</h1>
      </div>
      <div>
        <input type="text" placeholder="Search" className="bg-background pl-2 rounded-md"></input>
      </div>
    </div>
  );
};
export default GuardSubNavbar;
