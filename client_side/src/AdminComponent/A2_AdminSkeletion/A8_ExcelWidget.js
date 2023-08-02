import excel from "../../StudentComponent/icons/icon-excel.png"
import add from "../../StudentComponent/icons/icon-add.png"
const A8_ExcelWidget = () =>{
        return(
            <div>
                <div className={``}>
                    <div className={`bg-white shadow-md rounded-xl`}>
                        <p className={`font-bold p-2 mt-4 text-center`}>Upload Excel User Data</p>
                    </div>

                    <div className={`flex flex-col items-center mx-16`}>
                        <div className={`flex flex-col items-center bg-Items_bg p-4 mt-4 rounded-xl `}>
                            <div className={`mb-2 `}>
                                <img src={`${excel}`} />
                            </div>
                            <div>
                                <p className={`font-bold`}>Drag or tap to upload</p>
                            </div>
                        </div>
                        <div className={`mt-2`}>
                            <img src={`${add}`} alt={`add`} className={`w-8 h-8`}></img>
                        </div>
                    </div>

                </div>
            </div>
        )
}
export default A8_ExcelWidget;