import React, { useEffect, useState } from "react";
import Navbar from "../ChiefWardenSkeleton/CW1_Navbar";
import SubNavbar from "../ChiefWardenSkeleton/CW2_SubNavbar";
import Widgets from "../ChiefWardenSkeleton/CW3_Widgets"
import Table from "../ChiefWardenSkeleton/CW4_tableComponents/CW4_1_pendingTable"
import Cookies from "js-cookie";
import moment from "moment";

const CheifWardenGatepassRequest = () => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  // console.log(accessToken);
  const tabs = ["Gatepass Requests", "AutoApproved / Blocked", "Notifications", "Profile Requests"]
  const [GpDropdown, setGpDropdown] = useState("Pending Requests")
  const dropdownValues=["Pending Requests", `All Gatepass Requests for ${moment().format("DD-MM-YYYY")}`]
  const [Tb_data_Api, setTb_data_Api] = useState("http://localhost:4000/gatepass/v2/warden/get_dashboard_others");
  const [data, setData] = useState([]);
 
  useEffect( () => {
    if (GpDropdown === "PendingRequest") {
      setTb_data_Api("http://localhost:4000/gatepass/v2/warden/get_dashboard_others");
    } else {
      setTb_data_Api("http://localhost:4000/gatepass/v2/warden/get_all_gatepass");
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

    // if (GpDropdown ===  `All Gatepass Requests for ${moment().format("DD-MM-YYYY")}`) {
    //   setTb_data_Api(
    //     data.filter((item) => {
    //       return item.applied_date === moment().format("DD-MM-YYYY");
    //     })
    //   )
    // }
  }, [GpDropdown, Tb_data_Api, accessToken,data])

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

export default CheifWardenGatepassRequest;
