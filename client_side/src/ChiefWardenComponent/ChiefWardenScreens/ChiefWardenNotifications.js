import React, { useEffect, useState } from "react";
import Navbar from "../ChiefWardenSkeleton/CW1_Navbar";
import SubNavbar from "../ChiefWardenSkeleton/CW2_SubNavbar";
import Widgets from "../ChiefWardenSkeleton/CW3_Widgets"
import Table from "../ChiefWardenSkeleton/CW4_tableComponents/CW4_6_NotificationTable"
import Cookies from "js-cookie";
import NotificationForm from "../ChiefWardenSkeleton/CW8_NotificationsForm"

const ChiefWardenNotifications = () => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const tabs = ["Gatepass Requests", "AutoApproved","Blocked", "Notifications", "Profile Requests"]
  const [GpDropdown, setGpDropdown] = useState("Currently Active")
  const dropdownValues=["Currently Active", "Notifications History"]
  const [Tb_data_Api, setTb_data_Api] = useState("set api here");
  const [data, setData] = useState([]);
 
  // useEffect( () => {
  //   if (GpDropdown === "Currently Active") {
  //     setTb_data_Api("set api here");
  //   } else {
  //     setTb_data_Api("set api here");
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
  // }, [GpDropdown, Tb_data_Api, accessToken])

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
      <div className="bg-background flex justify-between px-4 py-4 flex-col sm:flex-row sm:items-start">
      <div className="flex-1 ">
        <Table data={data}  />
        </div>
        <div className="flex-1">
        <NotificationForm/>
      </div>
      </div>
    </div>
  );
};

export default ChiefWardenNotifications;
