import send from "../../StudentComponent/icons/icon-send.png"
const A7_Notification = () =>{
    return(
        <div>
            <div className={`bg-Items_bg rounded-xl p-2 m-2 `}>
                <div>
                    <p className={`font-bold`}>Notification</p>
                </div>
                <div>
                    <input
                    className={`rounded-xl text-center mt-2 w-full p-1`}
                    placeholder={`Send a Notification`}/>
                </div>
                <div className={`flex mt-2 justify-evenly`}>
                    <p className={`font-bold`}>Group</p>
                    <select className={`rounded-xl p-1`}></select>
                    <p className={`font-bold`}>SubGroup</p>
                    <select className={`rounded-xl p-1`}></select>
                    <img src={`${send}`} className={`w-4 h-4 mt-2`}></img>
                </div>

            </div>
        </div>
    )
}
export default A7_Notification;