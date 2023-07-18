import React, { useEffect, useState } from "react";
import Navbar from "../ChiefWardenSkeleton/CW1_Navbar";
import SubNavbar from "../ChiefWardenSkeleton/CW2_SubNavbar";
import Widgets from "../ChiefWardenSkeleton/CW3_Widgets"
import Table from "../ChiefWardenSkeleton/CW4_tableComponents/CW4_1_pendingTable"
import Cookies from "js-cookie";
import moment from "moment";
import WardenWiseGatepass from "../ChiefWardenSkeleton/CW7_wardenWiseGatepass";
const CheifWardenGatepassRequest = () => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const[totalPending,setTotalPending]=useState(0)
  const tabs = ["Gatepass Requests", "AutoApproved","Blocked", "Notifications", "Profile Requests"]
  const [GpDropdown, setGpDropdown] = useState("All Pending Requests")
  const dropdownValues=["All Pending Requests", `All Gatepass Requests for ${moment().format('MMMM Do YYYY')}`]
  const [Tb_data_Api, setTb_data_Api] = useState("http://localhost:4000/gatepass/v2/warden/get_dashboard_others");
  const [data, setData] = useState([]);
 
  useEffect( () => {
    if (GpDropdown === "All Pending Requests") {
      setTb_data_Api("http://localhost:4000/gatepass/v2/warden/get_dashboard_others");
    } else {
      setTb_data_Api("http://localhost:4000/gatepass/v2/ChiefWarden/getAllGatePassesToday");
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
    if (GpDropdown !== `All Gatepass Requests for ${moment().format('MMMM Do YYYY')}`) {
      setTotalPending(data.length)
    }
  }, [GpDropdown, Tb_data_Api, accessToken,data.length])

  return (
    <div className="w-screen h-screen bg-background">
      <div>
        <Navbar />
      </div>
      <div>
        <SubNavbar tabs={tabs} />
      </div>
      <div>
        <Widgets setGpDropdown={setGpDropdown} dropdownValues={dropdownValues} totalPending={totalPending} />
      </div>
      <div className="bg-background flex justify-between px-4 py-4 flex-col sm:flex-row sm:items-start">
      <div className="flex-1 ">
        <Table data={data}  />
        </div>
        <div className="flex-1">
        <WardenWiseGatepass/>
      </div>
      </div>
    </div>
  );
};

export default CheifWardenGatepassRequest;
