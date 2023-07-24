import {useEffect, useState} from "react";
import A2_GroupTable from "../A5_Handlers/A2_GroupTable";
import Cookies from "js-cookie";
const A2_GroupFunc = () =>{

    const [groupData, setGroupData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    const token = Cookies.get("ACCESS_TOKEN")

    const paginate = (array, page_size,  page_number) =>{
        return array.slice((page_number-1)*page_size, page_number*page_size)
    }

    const handleNextPage = () => {
        setPageNumber((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber((prevPage) => prevPage - 1);
        }
    };

    useEffect(() => {
        const getData = async()=>{
            try {
                const response = await fetch('http://localhost:4000/gatepass/v2/admin/get_all_groups', {
                    headers: {
                        Authorization: token
                    },
                });
                if(response.ok){
                    const data = await response.json();
                    const paginatedData = paginate(data, 5, pageNumber)
                    setGroupData(paginatedData);
                }else{
                    throw new Error("Some error occurred")
                }
            }catch (error){
                console.error(error)
            }
        }
        getData()
    },[token, pageNumber])


    return(
        <div>
            <A2_GroupTable groupData={groupData}
            handleNextPage = {handleNextPage}
            handlePreviousPage = {handlePreviousPage}
            page_number = {pageNumber}
            />
        </div>
    );
}
export default A2_GroupFunc;