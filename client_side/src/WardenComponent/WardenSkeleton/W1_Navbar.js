import React from "react";
import Niit_logo from "../icons/icon-niit.png"
import Logout from "../icons/icon-logout.png";
import Strings from "../WardenDashboard/Strings.json";
import designs from "../WardenStyling/W1_NavbarCSS";

const StudentNavbar = () => {

  return (
    <div>
      <div>
        <nav className={`${designs.Navbar["d-1"]}`}>
          <div className={`${designs.Navbar["d-2"]}`}>
           <img
              src={Niit_logo}
              alt={`${Strings.navbar_heading_1}`}
              className={`${designs.Navbar["d-3"]}`}
            />
            <h1 className={`${designs.Navbar["d-4"]}`}>
              {Strings.navbar_heading_1}
            </h1>
            
          </div>
          <div className={`${designs.Navbar["d-5"]}`}>
            <ul className={`${designs.Navbar["d-6"]}`}>
              <button className={`${designs.Navbar["d-7"]}`} onClick={()=>{alert(`clicked ${Strings.list_1}`)}}>{Strings.list_1}</button>
              <button className={`${designs.Navbar["d-7"]}`} onClick={()=>{alert(`clicked ${Strings.list_2}`)}}>{Strings.list_2}</button>
              <button className={`${designs.Navbar["d-7"]}`} onClick={()=>{alert(`clicked ${Strings.list_3}`)}}>{Strings.list_3}</button>
            </ul>
            <button onClick={()=>{alert('clicked')}}> 
            <img
              src={Logout}
              alt={`${Strings["alt-1"]}`}
              className={`${designs.Navbar["d-8"]}`}
            />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default StudentNavbar;
