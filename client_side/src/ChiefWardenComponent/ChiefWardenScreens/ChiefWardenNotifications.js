import React, { useEffect, useState } from "react";
import Navbar from "../ChiefWardenSkeleton/CW1_Navbar";
import SubNavbar from "../ChiefWardenSkeleton/CW2_SubNavbar";
import Widgets from "../ChiefWardenSkeleton/CW3_Widgets"
import Table from "../ChiefWardenSkeleton/CW4_tableComponents/CW4_1_pendingTable"
import Cookies from "js-cookie";

const WardenPendingRequest = () => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  // console.log(accessToken);
  const tabs = ["Pending Requests", "Approved / Cancelled", "AutoApproved", "Visitor Requests"]
  const [GpDropdown, setGpDropdown] = useState("MyGatepassRequest")
  const dropdownValues=["MyGatepassRequest", "OthersGatepassRequest"]
  const [Tb_data_Api, setTb_data_Api] = useState("http://localhost:4000/gatepass/v2/warden/get_dashboard_my");
  const [data, setData] = useState([]);
 
  useEffect( () => {
    if (GpDropdown === "MyGatepassRequest") {
      setTb_data_Api("http://localhost:4000/gatepass/v2/warden/get_dashboard_my");
    } else {
      setTb_data_Api("http://localhost:4000/gatepass/v2/warden/get_dashboard_others");
    }
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
  }, [GpDropdown, Tb_data_Api, accessToken])

  return (
    <div className="w-screen h-screen bg-background">
      <div>
        <Navbar />
      </div>
      <div>
        <SubNavbar tabs={tabs} />
      </div>
      <div>
        <Widgets setGpDropdown={setGpDropdown} dropdownValues={dropdownValues} />
      </div>
      <div>
        <Table data={data}  />
      </div>
    </div>
  );
};

export default WardenPendingRequest;
