const A4_Widgets = () =>{
    return(
        <div className={`grid grid-cols-2 gap-2 m-2`}>
            <div className={`flex bg-white shadow-md rounded-2xl p-2 justify-center font-bold`}>
                <p className={`mx-2`}>Pending Request:</p>
                <p>0</p>
            </div>

            <div className={`flex bg-white shadow-md rounded-2xl p-2 justify-center font-bold`}>
                <p className={`mx-2`}>In Campus:</p>
                <p>0</p>
            </div>

            <div className={`flex bg-white shadow-md rounded-2xl p-2 justify-center font-bold`}>
                <p className={`mx-2`}>Out Campus:</p>
                <p>0</p>
            </div>

            <div className={`flex bg-white shadow-md rounded-2xl p-2 justify-center font-bold`}>
                <p className={`mx-2`}>Blocked:</p>
                <p>0</p>
            </div>
        </div>

    );
}
export default A4_Widgets;