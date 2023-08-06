import A7_Notification from "../A2_AdminSkeletion/A7_Notification";
import React from "react";
import designs from "../A3_AdminStyling/A2_GatepassTableStyling";

const A6_Notification = () =>{
    return(
        <>
        <A7_Notification/>
            <div>
                <div className={`${designs.d1} mt-2`}>
                    <div className={`${designs.d2}`}>
                        <h1 className={`${designs.d5}`}>Group</h1>
                        <h1 className={`${designs.d5}`}>SubGroup</h1>
                        <h1 className={`${designs.d5}`}>Notification</h1>
                    </div>
                </div>
                <div className={`${designs.d3}`}>
                    <p className={`font-bold text-center`}>No Notification to show</p>
                </div>
            </div>
        </>
    )
}
export default A6_Notification