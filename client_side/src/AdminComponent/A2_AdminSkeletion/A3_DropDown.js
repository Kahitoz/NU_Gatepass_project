import React, {useState} from "react";
const A3_DropDown = () =>{
    const [selectedOption, setSelectedOption] = useState("")

    return(
        <div>
            <div>
                <select
                    className="bg-white py-2 px-4 rounded-xl m-4 font-bold text-black shadow-md"
                    value={selectedOption}
                >
                    <option value="">Pending Gatepass</option>
                    <option value="Group">Group</option>
                    <option value="Subgroup">Subgroup</option>
                    <option value="BlockedStudents">BlockedStudents</option>
                    <option value="Allusers">All Users</option>
                    <option value="ChangeRole">Change Role</option>
                </select>
            </div>
        </div>
    )
}

export default A3_DropDown