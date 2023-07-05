import React, { useEffect } from 'react'
import designs from '../../WardenStyling/W4_TableCSS';
import moment from "moment";
import ApprovedModal from "./ModalApproved";
import RejectedModal from "./ModalRejected";
import { useState } from 'react';

 const W4_2_ApprovedCancelledTable = (props) => {
    const [userData, setUserData] = useState([]);
    const [showRejectedModal, setShowRejectedModal] = useState(false);
    const [showApprovedModal, setShowApprovedModal] = useState(false);
    useEffect(() => {
       if(props.GpDropdown==="Cancelled")
        setShowRejectedModal(true);
        else{
          setShowApprovedModal(true);
        }
    }, [props.GpDropdown]);
    
    const [filterData, setFilterData] = useState(props.TbData); //filterData is the data that is to be displayed in the table
    return (
          <div>
          {props.GpDropdown==="Approved" && <ApprovedModal setOpenModal={setShowApprovedModal} data={userData} /> }
          {props.GpDropdown==="Cancelled"&& <RejectedModal setOpenModal={setShowRejectedModal} data={userData}/>}
          <div>
            <div className={`${designs.d1}`}>
              <div className={`${designs.d2}`}>
                <h1 className={`${designs.d5}`}>Name</h1>
                <h1 className={`${designs.d5}`}>Enrollment</h1>
                <h1 className={`${designs.d5}`}>Gatepass Type</h1>
                <h1 className={`${designs.d5}`}>Applied Date/Time</h1>
                <h1 className={`${designs.d5}`}>Status</h1>
                <h1 className={`${designs.d5}`}>Actions</h1>
              </div>
            </div>
    
            <div className={`${designs.d3}`}>
              {filterData.map((item, idx) => (
                <div className={`${designs.d4} hover:bg-row_hover_bg`} key={idx}>
                  <h1 className={`${designs.d5} `}>{item.name}</h1>
                  <h1 className={`${designs.d5}`}>{item.user_id}</h1>
                  <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
                  <h1 className={`${designs.d5}`}>
                    {moment(item.from_date).format("YYYY-MM-DD")}
                    <br/>
                    {moment(item.from_time).format("HH:mm:ss")}
                  </h1>
                  <h1 className={`${designs.d5}`}>
                    {item.Status}
                  </h1>
                  <div className={`${designs.d5}`}>
                    <button
                      id={`button ${idx}`}
                      name={item.request_id}
                      onClick={() => {
                        setShowModal(true);
                        setUserData(
                          props.data.filter((obj) => {
                            return obj.request_id == item.request_id;
                          })
                        );
                      }}
                      className=" bg-Navbar_bg p-2 text-white hover:border-2"
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}
export default W4_2_ApprovedCancelledTable;