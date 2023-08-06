import Navbar from "../A2_AdminSkeletion/A1_Navbar"
import SubNavbar from "../../StudentComponent/StudentSkeleton/S2_SubNavbar";
import A2_PendingFunc from "../A4_Functionality/A1_PendingFunc";
import A3_DropDown from "../A2_AdminSkeletion/A3_DropDown";
import A4_Widgets from "../A2_AdminSkeletion/A4_Widgets";
import A5_GroupSubgroupTable from "../A2_AdminSkeletion/A5_GroupSubgroupTable";
import add from "../../StudentComponent/icons/icon-add.png"
import {useState} from "react";
import A2_GroupFunc from "../A4_Functionality/A2_GroupFunc";
import A3_SubGroupFunc from "../A4_Functionality/A3_SubGroupFunc";
import A4_ParaConfigFunc from "../A4_Functionality/A4_ParaConfigFunc";
import A5_AllUsersFunc from "../A4_Functionality/A5_AllUsersFunc";
import A6_ChangeRole from "../A4_Functionality/A6_ChangeRoleFunc";
import A7_StartEndFunc from "../A4_Functionality/A7_StartEndFunc";
import A6_Notification from "../A5_Handlers/A6_Notification";
const A1_Home = () =>{

    const [selectedOption, setSelectedOption] = useState("");
    const handleOptionChange  = (option) =>{
        setSelectedOption(option);
    }
   return(
      <div className="w-screen h-screen bg-background ">
         <div>
             <Navbar/>
         </div>
          <div>
              <SubNavbar/>
          </div>

          <div className={`flex justify-between px-4 py-4 flex-col sm:flex-row sm:items-start`}>
              <div className={`flex-1`}>
                  <div className={`justify-between px-4 py-4 flex sm:flex-row sm:items-start`}>
                      <div className={`flex-1`}>
                          <A3_DropDown onChangeOption={handleOptionChange}/>
                      </div>
                      <div className={`flex-1`}>
                          <A4_Widgets/>
                      </div>
                  </div>

                  <div>
                      {selectedOption === "" && <A4_ParaConfigFunc/>}
                      {selectedOption === "Pending_Gatepass" && <A2_PendingFunc/>}
                      {selectedOption === "Group" && <A2_GroupFunc/>}
                      {selectedOption === "Subgroup" && <A3_SubGroupFunc/>}
                      {selectedOption === "ParameterConfig" && <A4_ParaConfigFunc/>}
                      {selectedOption === "Allusers" && <A5_AllUsersFunc/>}
                      {selectedOption === "ChangeRole" && <A6_ChangeRole/>}
                      {selectedOption === "Notification" && <A6_Notification/>}
                  </div>
              </div>

              <div className={`bg-background flex-1`}>
                  <div>
                      <p className={`font-bold text-center m-4 text-xl bg-white p-2 rounded-xl shadow-md `}>Handle AutoApprove Group and Subgroup</p>
                  </div>
                  <div className={`justify-between px-4 py-4 flex sm:flex-row sm:items-start`}>
                      <div className={`flex-1`}>
                          <div className={`flex justify-center`}>
                              <p className={`font-bold text-center`}>Allowed</p>
                              <img src={`${add}`} alt = {`add`} className={`w-6 h-6 ms-2`}></img>
                          </div>
                          <A5_GroupSubgroupTable/>
                          <A7_StartEndFunc/>
                      </div>

                  </div>

              </div>
          </div>
      </div>
   );
}
export default A1_Home;