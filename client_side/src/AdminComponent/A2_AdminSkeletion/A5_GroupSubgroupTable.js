import designs from "../A3_AdminStyling/A2_GatepassTableStyling";
import React from "react";
const A5_GroupSubgroupTable = () =>{
    return(
        <div>
            <div>
                <div className={`${designs.d1} mt-2`}>
                    <div className={`${designs.d2}`}>
                        <h1 className={`${designs.d5}`}>Group</h1>
                        <h1 className={`${designs.d5}`}>SubGroup</h1>
                        <h1 className={`${designs.d5}`}>Action</h1>
                    </div>
                </div>
                <div className={`${designs.d3}`}>
                    <p className={`font-bold text-center`}>No data Available</p>
                </div>
            </div>
        </div>
    );
}

export default A5_GroupSubgroupTable;