import React, { useState, useEffect } from "react";
import moment from "moment";
import { sortBy } from "lodash";
import Cookies from "js-cookie";
import Checkin from "./G4_1_checkIn"; 
import CheckOut from "./G4_2_checkOut";


const G3_table = (props) => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const [data, setData] = useState([]);
  const [pgNo, setPgNo] = useState(1);
  const [TbData, setTbData] = useState([]);
  const [user, setUser] = useState([]);
  const [checkin_checkout_api, setCheckin_checkout_api] = useState('http://localhost:4000/gatepass/v2/guard/checkout_student/')
  const [userStatusApi, setUserStatusApi] = useState([]);



  let Tb_data_Api = '';
  useEffect(() => {

    if (props.SubNavOption === "Check Out") {
      Tb_data_Api = "http://localhost:4000/gatepass/v2/guard/approved_students"
      setCheckin_checkout_api("http://localhost:4000/gatepass/v2/guard/checkout_student/");
      setUserStatusApi("http://127.0.0.1:4000/gatepass/v2/guard/update_user_status_absent/");

    }
    else {
      Tb_data_Api = "http://localhost:4000/gatepass/v2/guard/checked_out_students"
      setCheckin_checkout_api("http://localhost:4000/gatepass/v2/guard/checkin_student/");
      setUserStatusApi("http://127.0.0.1:4000/gatepass/v2/guard/update_user_status_present/");
    }

  }, [props.SubNavOption])




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Tb_data_Api, {
          headers: {
            Authorization: accessToken,
          },
        });
        const jsonData = await response.json();
        setData(sortBy(jsonData,
          [
            (o) => moment(o.from_date).unix(),
            (o) => moment(o.from_time).unix(),
          ]
        )
        ); // Data sorted by date and time
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
      setPgNo(1);
  }, [Tb_data_Api, accessToken, props.SubNavOption]);

  useEffect(() => {
    const paginate = (array, page_size, page_number) => {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
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
  // Checkin and Checkout Logic
  const Student_checkin_checkout = async (api, user_id, request_id) => { //for checkin and checkout
    let fetchData = fetch(
      api,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          check_in_by: "nugr11",
          check_out_by: "nugr11",
          user_id: user_id,
          request_id: request_id,
        }),
      }
    )
      .then((Response) => Response.json())
      .then((response) => console.log("Success: " + response.msg))
      .catch((error) => console.log("error: " + error));
    return fetchData;
  };

  const updateUserStatus = async (api, user_id) => { //for absent or present
    let fetchData = fetch(
      api,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          user_id: user_id,
        }),
      }
    )
      .then((Response) => Response.json())
      .then((response) => console.log("success: " + response.msg))
      .catch((error) => console.log("error: " + error));
    return fetchData;
  };


  const updateDefaulterFlag = async (user_id, request_id) => {
    let fetchData = fetch(
      "http://127.0.0.1:4000/gatepass/v2/guard/update_defaulter_flag/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          user_id: user_id,
          request_id: request_id,
        }),
      }
    )
      .then((Response) => Response.json())
      .then((response) => console.log("success: " + response.msg))
      .catch((error) => console.log("error: " + error));
    return fetchData;
  };



  const handleApprove = async (event) => {
    const request_id = event.target.name;
    const currentUser = data.filter((obj) => {
      return obj.request_id == request_id;
    });
    // console.log(currentUser[0].user_id);
    const user_id = currentUser[0].user_id;
    await Student_checkin_checkout(checkin_checkout_api, user_id, request_id);
    await updateUserStatus(userStatusApi, user_id);
    await updateDefaulterFlag(user_id, request_id);
    window.location.reload(true);

  };



  return (
    <div className="bg-background">
      {props.SubNavOption === "Check Out" ? <CheckOut TbData={TbData} handleApprove={handleApprove} SubNavOption={props.SubNavOption}/> : <Checkin TbData={TbData} handleApprove={handleApprove} SubNavOption={props.SubNavOption}/>}

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

export default G3_table;