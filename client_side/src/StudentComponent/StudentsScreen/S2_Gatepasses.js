import React from "react";
import Navbar from "../StudentSkeleton/S1_Navbar"
import Subnavbar from"../StudentSkeleton/S2_SubNavbar"
import Form from "../StudentGatepassHandler/S6_FormFunctionality"
import designs from "../StudentStyling/S0_ScreenCSS";

const S2_Gatepasses = () => {

    return(
        <div className={`${designs.d1}`}>
            <div>
                <Navbar/>
            </div>
            <div>
                <Subnavbar/>
            </div>
            <div>
                <Form/>
            </div>
        </div>
    )

}
export default S2_Gatepasses;