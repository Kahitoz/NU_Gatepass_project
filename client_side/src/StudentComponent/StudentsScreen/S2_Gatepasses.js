import React from "react";
import Navbar from "../StudentSkeleton/S1_Navbar"
import Subnavbar from"../StudentSkeleton/S2_SubNavbar"
import Form from "../StudentSkeleton/S6_Form"

const S2_Gatepasses = () => {

    return(
        <div className="bg-background w-screen h-screen">
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