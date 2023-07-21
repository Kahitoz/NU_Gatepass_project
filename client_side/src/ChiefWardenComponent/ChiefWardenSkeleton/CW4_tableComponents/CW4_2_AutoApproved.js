import React,{ useState,useEffect } from 'react'
import designs from '../../ChiefWardenStyling/CW4_TableCSS';
import moment from "moment";
import orderBy from "lodash/orderBy";
// import ModalApproved from "./Modal/ModalApproved";
// import ModalRejected from "./Modal/ModalRejected";

 const CW4_2_ApprovedCancelledTable = ({data}) => {
    const [userData, setUserData] = useState([]);
    const [Status, setStatus] = useState("");
    // const [showModal, setShowModal] = useState(false);
    const [pgNo, setPgNo] = useState(1);
  const [TbData, setTbData] = useState([]);
  useEffect(() => {
    const paginate = (array, page_size, page_number) => {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    };

    const paginatedData = paginate(orderBy(data,["from_date"],['desc']), 5, pgNo);
    setTbData(paginatedData);
  }, [pgNo, data]);

  const handleNextPage = () => {
    setPgNo((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (pgNo > 1) {
      setPgNo((prevPage) => prevPage - 1);
    }
  };
    
  return (
    <div>
          <div>
            <div className={`${designs.d1}`}>
              <div className={`${designs.d2}`}>
                <h1 className={`${designs.d5}`}>S.no</h1>
                <h1 className={`${designs.d5}`}>Group</h1>
                <h1 className={`${designs.d5}`}>SubGroup</h1>
                <h1 className={`${designs.d5}`}>From Date|Time</h1>
                <h1 className={`${designs.d5}`}>To Date|Time</h1>
                <h1 className={`${designs.d5}`}>AutoApproved by</h1>
              </div>
            </div>
    
            <div className={`${designs.d3}`}>
              {TbData.map((item, idx) => (
                <div className={`${designs.d4} hover:bg-row_hover_bg hover:-translate-y-1 hover:duration-75`} key={idx}>
                  <h1 className={`${designs.d5} `}>{idx+1}</h1>
                  <h1 className={`${designs.d5} `}>{item.groupName}</h1>
                  <h1 className={`${designs.d5}`}>{item.subGroup}</h1>
                  <h1 className={`${designs.d5}`}>
                    {moment(item.from_date).format("YYYY-MM-DD")}
                  <br/>
                    {moment(item.from_time).format("HH:mm:ss")}
                  </h1>
                  <h1 className={`${designs.d5}`}>
                    {moment(item.to_date).format("YYYY-MM-DD")}
                  <br/>
                    {moment(item.to_time).format("HH:mm:ss")}
                  </h1>
                  <h1 className={`${designs.d5}`}>{item.name}</h1>
                  {/* <div className={`${designs.d5}`}>
                    <button
                      id={`button ${idx}`}
                      name={item.request_id}
                      onClick={() => {
                        setShowModal(true);
                        setUserData(
                          data.filter((obj) => {
                            return obj.request_id == item.request_id;
                          })
                        );
                      }}
                      className=" bg-Navbar_bg p-2 text-white hover:border-2"
                    >
                      Open
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
          {TbData.length>1 && <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
            onClick={handlePreviousPage}
            disabled={pgNo === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
            onClick={handleNextPage}
            disabled={TbData.length < 5}
          >
            Next
          </button>
        </div>}
      </div>
      );
}
export default CW4_2_ApprovedCancelledTable;