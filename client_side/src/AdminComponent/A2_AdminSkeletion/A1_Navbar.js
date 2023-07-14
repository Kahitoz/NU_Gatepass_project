import designs from "../A3_AdminStyling/A1_NavbarStyling";
import Niit_logo from "../../StudentComponent/icons/icon-niit.png";
import {Link} from "react-router-dom";
import Logout from "../../StudentComponent/icons/icon-logout.png";

const A1_Navbar = () =>{
    return(
        <div>
            <div>
                <nav className={`${designs.d1}`}>
                    <div className={`${designs.d2}`}>
                        <img src={Niit_logo} alt="NIIT University" className={`${designs.d3}`} />
                        <h1 className={`${designs.d4}`}>
                            NIIT University
                        </h1>
                    </div>
                    <div className={`${designs.d5}`}>
                        <ul className={`${designs.d6}`}>
                            <Link to="/admin/dashboard">
                                <li className={`${designs.d7} hover:cursor-pointer hover:text-Navbar_bg`}>Home</li>
                            </Link>
                            <Link to="/admin/reports">
                                <li className={`${designs.d7} hover:cursor-pointer hover:text-Navbar_bg`}>Reports</li>
                            </Link>
                            <Link to="/admin/settings">
                                <li className={`${designs.d7} hover:cursor-pointer hover:text-Navbar_bg`}>Settings</li>
                            </Link>
                        </ul>
                        <Link to="/">
                            <img src={Logout} alt="NIIT University" className={`${designs.d8} hover: cursor-pointer`} />
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default A1_Navbar;