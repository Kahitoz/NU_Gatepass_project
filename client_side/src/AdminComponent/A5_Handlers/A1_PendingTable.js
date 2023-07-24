import React from 'react';
import moment from 'moment';
import designs from "../A3_AdminStyling/A2_GatepassTableStyling";

const A1_PendingTable = ({ TbData, handlePreviousPage, handleNextPage, setShowModal, setUserData, pgNo }) => {
    if (!TbData || TbData.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <div>
                <div className={`${designs.d1}`}>
                    <div className={`${designs.d2}`}>
                        <h1 className={`${designs.d5}`}>Name</h1>
                        <h1 className={`${designs.d5}`}>Enrollment</h1>
                        <h1 className={`${designs.d5}`}>Contact</h1>
                        <h1 className={`${designs.d5}`}>Gatepass Type</h1>
                        <h1 className={`${designs.d5}`}>Applied Date</h1>
                        <h1 className={`${designs.d5}`}>Applied Time</h1>
                        <h1 className={`${designs.d5}`}>Requested_to</h1>
                        <h1 className={`${designs.d5}`}>Actions</h1>
                    </div>
                </div>

                <div className={`${designs.d3}`}>
                    {TbData.map((item, idx) => (
                        <div className={`${designs.d4} hover:bg-row_hover_bg`} key={idx}>
                            <h1 className={`${designs.d5} `}>{item.name}</h1>
                            <h1 className={`${designs.d5}`}>{item.user_id}</h1>
                            <h1 className={`${designs.d5}`}>{item.contact_number}</h1>
                            <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
                            <h1 className={`${designs.d5}`}>{moment(item.from_date).format('YYYY-MM-DD')}</h1>
                            <h1 className={`${designs.d5}`}>{moment(item.from_time).format('HH:mm:ss')}</h1>
                            <h1 className={`${designs.d5}`}>{item.Requested_to}</h1>
                            <div className={`${designs.d5}`}>
                                <button
                                    id={`button ${idx}`}
                                    name={item.request_id}
                                    onClick={() => {
                                        setShowModal(true);
                                        setUserData(TbData.filter((obj) => obj.request_id === item.request_id));
                                    }}
                                    className="bg-Navbar_bg p-2 text-white hover:border-2"
                                >
                                    Open
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-4">
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
            </div>
        </div>
    );
};

export default A1_PendingTable;
