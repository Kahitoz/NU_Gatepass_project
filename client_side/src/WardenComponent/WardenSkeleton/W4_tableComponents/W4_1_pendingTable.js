import React from 'react'
import designs from '../../WardenStyling/W4_TableCSS';
import moment from "moment";
import Modal from "./ModalPending";
import { useState } from 'react';

 const W4_1_pendingTable = ({data,TbData}) => {
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    return (
          <div>
          {showModal && <Modal setOpenModal={setShowModal} data={userData} />}
          <div>
            <div className={`${designs.d1}`}>
              <div className={`${designs.d2}`}>
                <h1 className={`${designs.d5}`}>Name</h1>
                <h1 className={`${designs.d5}`}>Enrollment</h1>
                <h1 className={`${designs.d5}`}>Gatepass Type</h1>
                <h1 className={`${designs.d5}`}>Applied Date</h1>
                <h1 className={`${designs.d5}`}>Applied Time</h1>
                <h1 className={`${designs.d5}`}>Actions</h1>
              </div>
            </div>
    
            <div className={`${designs.d3}`}>
              {TbData.map((item, idx) => (
                <div className={`${designs.d4} hover:bg-row_hover_bg`} key={idx}>
                  <h1 className={`${designs.d5} `}>{item.name}</h1>
                  <h1 className={`${designs.d5}`}>{item.user_id}</h1>
                  <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
                  <h1 className={`${designs.d5}`}>
                    {moment(item.from_date).format("YYYY-MM-DD")}
                  </h1>
                  <h1 className={`${designs.d5}`}>
                    {moment(item.from_time).format("HH:mm:ss")}
                  </h1>
                  <div className={`${designs.d5}`}>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}
export default W4_1_pendingTable;