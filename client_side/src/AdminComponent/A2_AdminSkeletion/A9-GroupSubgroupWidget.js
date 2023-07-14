import group from "../../StudentComponent/icons/icon-group.png"
import subgroup from "../../StudentComponent/icons/icon-subgroup.png"
import user from "../../StudentComponent/icons/icon-add-user.png"

const A9_GroupSubGroupWidget = () => {
     return(
         <div>
             <div className={`bg-white shadow-md rounded-xl ms-2 `}>
                 <p className={`font-bold p-2 mt-3.5 text-center`}>Upload Excel User Data</p>
             </div>
             <div className={`mt-4`}>
                 <div>
                     <div className={`bg-Items_bg rounded-xl flex p-2 justify-evenly mt-2`}>
                         <img src={`${group}`}></img>
                         <p className={`font-bold`}>Tap to open the form for the group</p>
                     </div>
                     <div className={`bg-Items_bg rounded-xl flex p-2 justify-evenly mt-2 items-center`}>
                         <img src={`${subgroup}`}></img>
                         <p className={`font-bold`}>Tap to open the form for subgroup</p>
                     </div>
                     <div className={`bg-Items_bg rounded-xl flex p-2 justify-evenly mt-2`}>
                         <img src={`${user}`}></img>
                         <p className={`font-bold`}>Tap to open the form for the user</p>
                     </div>
                 </div>

             </div>
         </div>
     )
}
export default A9_GroupSubGroupWidget