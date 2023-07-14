import React,{ useState,useEffect } from 'react'
import designs from '../../ChiefWardenStyling/CW4_TableCSS';
import moment from "moment";
// import ModalApproved from "./Modal/ModalApproved";
// import ModalRejected from "./Modal/ModalRejected";

 const CW4_6_NotificationTable = ({data}) => {
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

    const paginatedData = paginate(data, 5, pgNo);
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
          <h1 className={`${designs.d5}`}>Notification</h1>
          <h1 className={`${designs.d5}`}>Created on</h1>
          <h1 className={`${designs.d5}`}>Added by</h1>
          <h1 className={`${designs.d5}`}>Effective Till</h1>
          <h1 className={`${designs.d5}`}>Status/Actions</h1>
        </div>
      </div>
      <div className={`${designs.d3}`}>
      {/* <div className={`${designs.d4}`}>
        <h1 className={`${designs.d5}`}>UG-2</h1>
        <h1 className={`${designs.d5}`}>Tower III Ground Floor</h1>
        <h1 className={`${designs.d5}`}>Narendra Bisht</h1>
      </div>
      
      <div className={`${designs.d4}`}>
        <h1 className={`${designs.d5}`}>UG-2</h1>
        <h1 className={`${designs.d5}`}>Tower II Ground Floor</h1>
        <h1 className={`${designs.d5}`}>Narendra Bisht</h1>
      </div>
     
      <div className={`${designs.d4}`}>
        <h1 className={`${designs.d5}`}>UG-2</h1>
        <h1 className={`${designs.d5}`}>Tower I Ground Floor</h1>
        <h1 className={`${designs.d5}`}>Narendra Bisht</h1>
      </div> */}
    </div>
   
    { TbData.length>1 && <div className="flex justify-center mt-4">
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
</div>
);
}
export default CW4_6_NotificationTable;