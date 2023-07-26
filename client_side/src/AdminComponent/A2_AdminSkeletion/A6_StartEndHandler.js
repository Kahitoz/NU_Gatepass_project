
import React from "react";
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
                <img className='hover:rotate-180 hover:duration-200 h-5 active:translate-y-0.5 hover:cursor-pointer 'src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png" alt="refresh"/>
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
                <img className='hover:rotate-180 hover:duration-200 h-5 active:translate-y-0.5 hover:cursor-pointer'src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png" alt="refresh"/>
            </div>
        </div>
    )
}

export default A6_StartEndHandler;