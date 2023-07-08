import React, { useEffect, useState } from "react";
import Navbar from "../WardenSkeleton/W1_Navbar";
import SubNavbar from "../WardenSkeleton/W2_SubNavbar";
import Widgets from "../WardenSkeleton/W3_Widgets"
import Table from "../WardenSkeleton/W4_tableComponents/W4_2_ApprovedCancelledTable"
import Cookies from "js-cookie";

const WardenApprovedCancelled = () => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  // console.log(accessToken);
  const tabs = ["Pending Requests", "Approved / Cancelled", "AutoApproved", "Visitor Requests"]
  const [GpDropdown, setGpDropdown] = useState("All")
  const dropdownValues=["All","Approved","Rejected", "Cancelled"]
  const [Tb_data_Api, setTb_data_Api] = useState("http://localhost:4000/gatepass/v2/warden/get_all_gatepass");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState(data);
 
  useEffect( () => {
    // if (GpDropdown === "MyGatepassRequest") {
    //   setTb_data_Api("http://localhost:4000/gatepass/v2/warden/get_all_gatepass");
    // } else {
    //   setTb_data_Api("http://localhost:4000/gatepass/v2/warden/get_all_gatepass");
    // }
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
  }, [Tb_data_Api, accessToken])

  useEffect(() => {
    if (GpDropdown === "All") {
      setFilterData(data);
    } else if (GpDropdown === "Approved") {
      setFilterData(data.filter((item) => item.status === "Approved"));
    } else if (GpDropdown === "Rejected") {
      setFilterData(data.filter((item) => item.status === "Rejected"));
  }
  else if (GpDropdown === "Cancelled") {
    setFilterData(data.filter((item) => item.status === "cancelled"));
  }
}, [GpDropdown,data]);

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
        <Table data={filterData} Gpdropdown={GpDropdown}  />
      </div>
    </div>
  );
};

export default WardenApprovedCancelled;
