import designs from "../A3_AdminStyling/A2_GatepassTableStyling";
import React, {useState} from "react";
import add from "../../StudentComponent/icons/icon-add.png"
import A2_AddGroup from "../A6_Modals/A2_AddGroup";

const A2_GroupTable = ({groupData, handleNextPage, handlePreviousPage, page_number}) =>{

        const [showAddGroup, setShowAddGroup] = useState(false);

    if (!groupData || !Array.isArray(groupData)) {
        return <div>Loading...</div>;
    }

    const startingIndex = (page_number - 1) * 5;

    return(
        <div className={`bg-background`}>

            <div>
                <div>
                    {showAddGroup === true && <A2_AddGroup setShowAddGroup={setShowAddGroup}/>}
                </div>
                <div className={`${designs.d1}`}>
                    <div className={`${designs.d2} grid grid-cols-12`}>
                        <div className={`${designs.d5} col-span-5`}>Sno.</div>
                        <div className={`${designs.d5} col-span-6`} >Group Name</div>
                        <div className={`${designs.d5} col-span-1 hover:cursor-pointer`}><img src={add} className={`w-6 h-6`} alt={`add`} onClick={()=>setShowAddGroup(true)}/> </div>
                    </div>
                </div>

                <div className={`${designs.d3}`}>
                    {groupData.map((item, idx) =>(
                        <div className={`${designs.d4} grid grid-cols-12`} key={idx}>
                            <h1 className={`${designs.d5} col-span-5`}>{idx+startingIndex+1}</h1>
                            <h1 className={`${designs.d5} col-span-7`}>{item.gps_groupname}</h1>
                        </div>
                    ))
                    }
                </div>
            </div>

            <div className="flex justify-center mt-4 bg-background">

                <button
                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
                    onClick={handlePreviousPage}
                    disabled={page_number === 1}
                >
                    Previous
                </button>
                <div className="mx-2 bg-background mt-2 ">Page: {page_number}</div>
                <button
                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
                    onClick={handleNextPage}
                    disabled={groupData.length < 5}
                >
                    Next
                </button>
            </div>

        </div>


    );
};
export default A2_GroupTable;