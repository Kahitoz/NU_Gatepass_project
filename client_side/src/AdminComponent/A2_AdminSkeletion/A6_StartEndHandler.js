import refresh from "../../StudentComponent/icons/icon-refresh.png"
const A6_StartEndHandler = () =>{
    return(
        <div>
            <div className={`flex bg-Items_bg rounded-xl p-3 justify-evenly mt-2`}>
                <p className={`font-bold`}>Start Time</p>
                <input className={`text-center rounded-xl w-10`}
                type={`number`}
                placeholder={`00`}/>
                <p className={`font-bold`}>hh</p>
                <input
                    className={`text-center rounded-xl w-10`}
                    type={`number`}
                    placeholder={`00`}/>
                <p className={` mx-2 font-bold`}>mm</p>
                <img src={`${refresh}`}></img>
            </div>

            <div className={`flex bg-Items_bg rounded-xl p-3 justify-evenly mt-2`}>
                <p className={`font-bold`}>End Time</p>
                <input className={`text-center rounded-xl w-10`}
                       type={`number`}
                       placeholder={`00`}/>
                <p className={`font-bold`}>hh</p>
                <input
                    className={`text-center rounded-xl w-10`}
                    type={`number`}
                    placeholder={`00`}/>
                <p className={` mx-2 font-bold`}>mm</p>
                <img src={`${refresh}`}></img>
            </div>
        </div>
    )
}

export default A6_StartEndHandler;