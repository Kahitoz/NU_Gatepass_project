import designs from "../WardenStyling/W4_TableCSS";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PendingTable from "./W4_tableComponents/W4_1_pendingTable";
import ApprovedCancelledTable from "./W4_tableComponents/W4_2_ApprovedCancelledTable";

const W4_table = (props) => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const [tableView,setTablView] = useState("Pending Requests");
  const [data, setData] = useState([]);
  const [pgNo, setPgNo] = useState(1);
  const [TbData, setTbData] = useState([]);
 
  let Tb_data_Api = "";
  useEffect(() => {
    
      if (props.subNavOption=== "Pending Requests") {
        setTablView("Pending Requests");

                if (props.GpDropdown !== "MyGatepassRequest") {
                Tb_data_Api ="http://localhost:4000/gatepass/v2/warden/get_dashboard_others";
                } else {
                Tb_data_Api = "http://localhost:4000/gatepass/v2/warden/get_dashboard_my";
              }
        }
        else if (props.subNavOption=== "Approved / Cancelled") {
          Tb_data_Api="http://localhost:4000/gatepass/v2/warden/get_all_gatepass";
          setTablView("Approved / Cancelled");
      }

      else if (props.subNavOption=== "AutoApproved") {
       Tb_data_Api="http://localhost:4000/gatepass/v2/warden/get_dashboard_my";
}
  
}, [props.subNavOption, props.GpDropdown]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(Tb_data_Api, {
          headers: {
            Authorization: accessToken,
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setPgNo(1);
  }, [Tb_data_Api, accessToken, props.subNavOption, props.GpDropdown]);

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
  // modal Logic

  return (
    <div className="bg-background">
      {tableView === "Pending Requests" ? <PendingTable data={data} TbData={TbData}/>: tableView === "Approved / Cancelled" ? 
      <ApprovedCancelledTable data={data} GpDropdown={props.GpDropdown} TbData={TbData}/>: null}

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

export default W4_table;
