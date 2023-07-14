import React, { useState, useEffect } from 'react';
import Modal from '../../WardenComponent/WardenSkeleton/W4_tableComponents/Modal/ModalPending'
import A2_GatepassTable from "../A2_AdminSkeletion/A2_GatepassTable";
import Cookies from "js-cookie";

const A2_GatepassFunc = () => {
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [pgNo, setPgNo] = useState(1);
    const [TbData, setTbData] = useState([]);

    const accessToken = Cookies.get("ACCESS_TOKEN");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/gatepass/v2/warden/get_dashboard_others', {
                    headers: {
                        Authorization: accessToken
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("The data from the others gate-pass is ", data)
                    const paginatedData = paginate(data, 5, pgNo);
                    await setTbData(paginatedData);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [accessToken, pgNo]);

    const paginate = (array, page_size, page_number) => {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    };

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
            {showModal && <Modal setOpenModal={setShowModal} data={userData} />}
            <A2_GatepassTable
                TbData={TbData}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                setShowModal={setShowModal}
                setUserData={setUserData}
                pgNo={pgNo}
            />
        </div>
    );
};

export default A2_GatepassFunc;
