import React from "react";
import Clouds from "../icons/icon-clouds.png";
import designs from "../StudentStyling/StudentSubNavbarCSS"
const StudentSubNavbar = () => {
  return (
    <div className={`${designs.subnav.d1}`}>
      <div className={`${designs.subnav.d2}`}>
        <h1 className={`${designs.subnav.d3}`}>Welcome Students</h1>
        <div className={`${designs.subnav.d4} `}>
          <img src={Clouds} alt="message" className={`${designs.subnav.d5}`}></img>
          <p className={`${designs.subnav.d6}`}>Weather message</p>
        </div>
      </div>

      <div className={`${designs.subnav.d7}`}>
        <h1 className={`${designs.subnav.d8}`}>Notification</h1>
        <p className={`${designs.subnav.d9}`}>No New Notificaion for display</p>
      </div>
    </div>
  );
};
export default StudentSubNavbar;
