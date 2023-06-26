import React from "react";
import Niit_logo from "../icons/icon-niit.png"
import Logout from "../icons/icon-logout.png";
import Strings from "../StudentsDashboard/Strings.json";
import designs from "../StudentStyling/StudentNavbarCSS";

const StudentNavbar = () => {

  return (
    <div>
      <div>
        <nav className={`${designs.Navbar["d-1"]}`}>
          <div className={`${designs.Navbar["d-2"]}`}>
            <img
              src={Niit_logo}
              alt={`${Strings.navbar_heading_1}`}
              className={`${designs.Navbar["d-3"]}`}w
            />
            <h1 className={`${designs.Navbar["d-4"]}`}>
              {Strings.navbar_heading_1}
            </h1>
            
          </div>
          <div className={`${designs.Navbar["d-5"]}`}>
            <ul className={`${designs.Navbar["d-6"]}`}>
              <li className={`${designs.Navbar["d-7"]}`}>{Strings.list_1}</li>
              <li className={`${designs.Navbar["d-7"]}`}>{Strings.list_2}</li>
            </ul>
            <img
              src={Logout}
              alt={`${Strings["alt-1"]}`}
              className={`${designs.Navbar["d-8"]}`}
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default StudentNavbar;
