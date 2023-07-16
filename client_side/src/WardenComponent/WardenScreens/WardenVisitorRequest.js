import React, { useEffect, useState } from "react";
import Navbar from "../WardenSkeleton/W1_Navbar";
import SubNavbar from "../WardenSkeleton/W2_SubNavbar";
import Widgets from "../WardenSkeleton/W3_Widgets"
import Table from "../WardenSkeleton/W4_tableComponents/W4_4_VisitorTable"
import Cookies from "js-cookie";

const WardenVisitorRequest = () => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  // console.log(accessToken);
  const tabs = ["Pending Requests", "Approved / Cancelled", "AutoApproved", "Visitor Requests"]
  const [GpDropdown, setGpDropdown] = useState("PendingRequest")
  const dropdownValues=["PendingRequest", "ServicedRequest"]
  const [Tb_data_Api, setTb_data_Api] = useState("http://localhost:4000/gatepass/v2/warden/get_dashboard_my");
  const [data, setData] = useState([]);
  const [pendingRequests, setPendingRequests] = useState(1);
 
  // useEffect( () => {
  //   if (GpDropdown === "MyGatepassRequest") {
  //     setTb_data_Api("http://localhost:4000/gatepass/v2/warden/get_dashboard_my");
  //   } else {
  //     setTb_data_Api("http://localhost:4000/gatepass/v2/warden/get_dashboard_others");
  //   }
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(Tb_data_Api, {
  //         headers: {
  //           Authorization: accessToken,
  //         },
  //       });
  //       const jsonData = await response.json();
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  //   if (GpDropdown === "MyGatepassRequest") {
  //     setPendingRequests(data.length);
  //   }
  // }, [GpDropdown, Tb_data_Api, accessToken,data.length])

  return (
    <div className="w-screen h-screen bg-background">
      <div>
        <Navbar />
      </div>
      <div>
        <SubNavbar tabs={tabs} />
      </div>
      <div>
        <Widgets setGpDropdown={setGpDropdown} dropdownValues={dropdownValues} pendingRequests={pendingRequests} />
      </div>
      <div>
        <Table data={data} setPendingRequests={setPendingRequests}  />
      </div>
    </div>
  );
};

export default WardenVisitorRequest;
