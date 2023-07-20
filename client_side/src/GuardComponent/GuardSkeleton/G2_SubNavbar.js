import React, { useState } from "react";
import designs from "../GuardStyling/G2_SubNavbarCSS";

const GuardSubNavbar = ({ setSubOption, handleChange, tab_Css }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleCheckInClick = () => {
        setSelectedOption("Check In");
        setSubOption("Check In");
    };

    const handleCheckOutClick = () => {
        setSelectedOption("Check Out");
        setSubOption("Check Out");
    };

    return (
        <div className={`${designs.subnav.d1}`}>
            <div className={`${designs.subnav.d2}`}>
                <h1 className={`${designs.subnav.d3}`}>Welcome Guard</h1>
                <button
                    name="Check Out"
                    className={`text-white -ml-2 mt-5 mb-0 pb-0 text-xl text-center p-2 rounded-sm ${
                        selectedOption === "Check Out" ? "bg-red-500  rounded-xl" : "hover:text-Navbar_bg hover:bg-white"
                    }`}
                    onClick={handleCheckOutClick}
                >
                    Check out
                </button>
                <button
                    name="Check In"
                    className={`text-white mt-5 mb-0 pb-0 text-xl text-center p-2 ml-3 rounded-sm ${
                        selectedOption === "Check In" ? "bg-red-500 rounded-xl" : "hover:text-Navbar_bg hover:bg-white"
                    }`}
                    onClick={handleCheckInClick}
                >
                    Check in
                </button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-background p-1.5 rounded-md"
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </div>
    );
};

export default GuardSubNavbar;
