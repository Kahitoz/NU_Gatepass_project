import Navbar from "../A2_AdminSkeletion/A1_Navbar"
import SubNavbar from "../../StudentComponent/StudentSkeleton/S2_SubNavbar";
import A2_GatepassFunc from "../A4_Functionality/A2_GatepassFunc";
import A3_DropDown from "../A2_AdminSkeletion/A3_DropDown";
import A4_Widgets from "../A2_AdminSkeletion/A4_Widgets";
import A5_GroupSubgroupTable from "../A2_AdminSkeletion/A5_GroupSubgroupTable";
import A6_StartEndHandler from "../A2_AdminSkeletion/A6_StartEndHandler";
import A7_Notification from "../A2_AdminSkeletion/A7_Notification";
import A8_ExcelWidget from "../A2_AdminSkeletion/A8_ExcelWidget";
import A9_GroupSubGroupWidget from "../A2_AdminSkeletion/A9-GroupSubgroupWidget";
import add from "../../StudentComponent/icons/icon-add.png"
const A1_Home = () =>{
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
                          <A3_DropDown/>
                      </div>
                      <div className={`flex-1`}>
                          <A4_Widgets/>
                      </div>
                  </div>

                  <div>
                      <A2_GatepassFunc/>
                  </div>
              </div>

              <div className={`bg-background flex-1`}>
                  <div>
                      <p className={`font-bold text-center m-4 text-xl bg-white p-2 rounded-xl shadow-md `}>Handle AutoApprove Group and Subgroup</p>
                  </div>
                  <div className={`justify-between px-4 py-4 flex sm:flex-row sm:items-start`}>
                      <div className={`flex-1`}>
                          <p className={`font-bold text-center`}>Allowed</p>
                          <A5_GroupSubgroupTable/>
                          <div className={`flex justify-center`}>
                              <img src={`${add}`} />
                          </div>
                          <A6_StartEndHandler/>
                          <A8_ExcelWidget/>
                      </div>
                      <div className={`flex-1`}>
                          <p className={`font-bold text-center`}>Restricted</p>
                          <A5_GroupSubgroupTable/>
                          <div className={`flex justify-center`}>
                              <img src={`${add}`} />
                          </div>
                          <div>
                              <A7_Notification/>
                          </div>
                          <div>
                              <A9_GroupSubGroupWidget/>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </div>
   );
}
export default A1_Home;