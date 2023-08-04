import React from "react";

const A6_StartEndHandler = ({ startDay, endDay, onStartDayChange, onEndDayChange }) => {
    const handleRefreshClick = () => {
        onStartDayChange(startDay);
        onEndDayChange(endDay);
        alert("The day has been refreshed")
    };
    return (
        <div>
            <div className={`grid grid-cols-3  bg-Items_bg rounded-xl p-3 mt-2`}>
                <p className={`font-bold col-span-1`}>From Starting Day</p>

                <select className={`rounded-full col-span-1 ms-2`} value={startDay} onChange={(e) => onStartDayChange(e.target.value)}>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>

                <img
                    className='hover:rotate-180 hover:duration-200 h-5 hover:cursor-pointer ms-8'
                    src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png"
                    alt="refresh"
                    onClick={handleRefreshClick}
                />
            </div>

            <div className={`grid grid-cols-3  bg-Items_bg rounded-xl p-3 mt-2`}>
                <p className={`font-bold col-span-1`}>To Ending Day</p>

                <select className={`rounded-full col-span-1 ms-2`} value={endDay} onChange={(e) => onEndDayChange(e.target.value)}>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>

                <img
                    className='hover:rotate-180 hover:duration-200 h-5 hover:cursor-pointer ms-8'
                    src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png"
                    alt="refresh"
                    onClick={handleRefreshClick}
                />
            </div>

            <div className={`grid grid-cols-3  bg-Items_bg rounded-xl p-3 mt-2`}>
                <p className={`font-bold col-span-1`}>Start Time</p>

                <input
                    type="time"
                    className="disabled:bg-Items_bg bg-Items_bg border-2 border-gray-300 rounded-md col-span-1 text-center"/>


                <img
                    className='hover:rotate-180 hover:duration-200 h-5 hover:cursor-pointer ms-8'
                    src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png"
                    alt="refresh"
                />
            </div>

            <div className={`grid grid-cols-3 bg-Items_bg rounded-xl p-3 mt-2`}>
                <p className={`font-bold col-span-1`}>End Time</p>

                <input
                    type="time"
                    className="disabled:bg-Items_bg bg-Items_bg border-2 border-gray-300 rounded-md col-span-1 text-center"/>

                <img
                    className='hover:rotate-180 hover:duration-200 h-5 hover:cursor-pointer ms-8'
                    src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png"
                    alt="refresh"
                />
            </div>

            <div className={`grid grid-cols-3  bg-Items_bg rounded-xl p-3 mt-2`}>
                <p className={`font-bold col-span-1`}>Buffer Time</p>

                <input
                type = "number"
                className={`rounded-full  text-center`}/>
                <img
                    className='hover:rotate-180 hover:duration-200 h-5 hover:cursor-pointer ms-8'
                    src="https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png"
                    alt="refresh"
                />
            </div>
        </div>
    );
}

export default A6_StartEndHandler;
