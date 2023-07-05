import Niit_logo from "../icons/icon-niit.png";
import Logout from "../icons/icon-logout.png";
import Strings from "../StudentsScreen/Strings.json";
import designs from "../StudentStyling/S1_NavbarCSS";
import { Link } from "react-router-dom";

const StudentNavbar = () => {
  

  return (
    <div>
      <div>
        <nav className={`${designs.Navbar["d-1"]}`}>
          <div className={`${designs.Navbar["d-2"]}`}>
            <img src={Niit_logo} alt={`${Strings.navbar_heading_1}`} className={`${designs.Navbar["d-3"]}`} />
            <h1 className={`${designs.Navbar["d-4"]}`}>
              {Strings.navbar_heading_1} 
            </h1>
          </div>
          <div className={`${designs.Navbar["d-5"]}`}>
            <ul className={`${designs.Navbar["d-6"]}`}>
              <Link to="/student/home">
              <li className={`${designs.Navbar["d-7"]} hover:cursor-pointer hover:text-Navbar_bg`}>{Strings.list_1}</li>
              </Link>
              <Link to="/student/gatepass">
              <li className={`${designs.Navbar["d-7"]} hover:cursor-pointer hover:text-Navbar_bg`}>{Strings.list_2}</li>  
              </Link>
            </ul>
            <Link to="/">
            <img src={Logout} alt={`${Strings["alt-1"]}`} className={`${designs.Navbar["d-8"]} hover: cursor-pointer`} />
            </Link> 
          </div>
        </nav>
      </div>
    </div>
  );
};

export default StudentNavbar;
