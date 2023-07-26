import React, {useState} from "react";
const A3_DropDown = ({onChangeOption}) =>{
    const [selectedOption, setSelectedOption] = useState("")
    const handleOptionChange = (event) =>{
        const value = event.target.value;
        setSelectedOption(value);
        onChangeOption(value);
    }

    return(
        <div>
            <div>
                <select
                    className="bg-white py-2 px-4 rounded-xl m-4 font-bold text-black shadow-md"
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    <option value="ParameterConfig">Parameter Configuration</option>
                    <option value="Pending_Gatepass">Pending Gatepass</option>
                    <option value="Group">Group</option>
                    <option value="Subgroup">Subgroup</option>
                    <option value="Allusers">All Users</option>
                    <option value="ChangeRole">Change Role</option>
                </select>
            </div>
        </div>
    )
}

export default A3_DropDown