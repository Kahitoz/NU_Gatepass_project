import send from "../../StudentComponent/icons/icon-send.png"
import DatePicker from "react-datepicker";
import React from "react";
const A7_Notification = () =>{
    return(
        <div>
            <div className={`bg-Items_bg rounded-xl p-2 m-2 `}>
                <div>
                    <p className={`font-bold text-center`}>Notification</p>
                </div>
                <div>
                    <input
                    className={`rounded-xl  mt-2 w-full p-1`}
                    placeholder={`Send a Notification`}/>
                </div>
                <div className={`flex mt-2 justify-evenly`}>
                    <p className={`font-bold bg-background p-1 rounded-md`}>Group</p>
                    <select className={`rounded-xl p-1`}></select>
                    <p className={`font-bold bg-background p-1 rounded-md`}>SubGroup</p>
                    <select className={`rounded-xl p-1`}></select>
                    <img src={`${send}`} className={`w-4 h-4 mt-2`}></img>
                </div>

                <div className={`flex justify-center mt-4`}>
                    <div className={`flex me-3`}>
                        <p className="font-bold bg-background p-1 rounded-md me-2">From Date</p>
                        <DatePicker
                            className="rounded-md bg-white mt-1"
                        />
                    </div>

                    <div className={`flex `}>
                        <p className="font-bold bg-background p-1 rounded-md me-2">To Date :</p>
                        <DatePicker
                            className="rounded-md bg-white mt-1"
                        />
                    </div>
                </div>


            </div>
        </div>
    )
}
export default A7_Notification;