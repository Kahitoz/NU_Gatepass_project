import designs from "../A3_AdminStyling/A2_GatepassTableStyling";
import React from "react";
import add from "../../StudentComponent/icons/icon-add.png"

const A2_SubGroupTable = ({subgroupData, handleNextPage, handlePreviousPage, page_number}) =>{
    if (!subgroupData || !Array.isArray(subgroupData)) {
        return <div>Loading...</div>;
    }

    const startingIndex = (page_number - 1) * 5;

    return(
        <div className={`bg-background`}>

            <div>
                <div className={`${designs.d1}`}>
                    <div className={`${designs.d2} grid grid-cols-12`}>
                        <div className={`${designs.d5} col-span-5`}>Sno.</div>
                        <div className={`${designs.d5} col-span-6`} >SubGroup Name</div>
                        <div className={`${designs.d5} col-span-1`}><img src={add} className={`w-6 h-6`} alt={`add`}/> </div>
                    </div>
                </div>

                <div className={`${designs.d3}`}>
                    {subgroupData.map((item, idx) =>(
                        <div className={`${designs.d4} grid grid-cols-12`} key={idx}>
                            <h1 className={`${designs.d5} col-span-5`}>{idx+startingIndex+1}</h1>
                            <h1 className={`${designs.d5} col-span-7`}>{item.subgroup_name}</h1>
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
                    disabled={subgroupData.length < 5}
                >
                    Next
                </button>
            </div>

        </div>


    );
};
export default A2_SubGroupTable;