import React, { useEffect, useState } from "react";
import Navbar from "../ChiefWardenSkeleton/CW1_Navbar";
import SubNavbar from "../ChiefWardenSkeleton/CW2_SubNavbar";
import Widgets from "../ChiefWardenSkeleton/CW3_Widgets"
import Table from "../ChiefWardenSkeleton/CW4_tableComponents/CW4_3_Blocked"
import Cookies from "js-cookie";
import BlockedForm from "../ChiefWardenSkeleton/CW5_AutoApprovedBlockedForm"

const ChiefWardenBlocked = () => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const tabs = ["Gatepass Requests", "AutoApproved","Blocked", "Notifications", "Profile Requests"]
  const [GpDropdown, setGpDropdown] = useState("Student Wise")
  const dropdownValues=["Student Wise", "Group Wise"]
  const [showStudentWise, setShowStudentWise] = useState(true);
  const[showGroupWise, setShowGroupWise] = useState(false);
   
  const [Tb_data_Api, setTb_data_Api] = useState("http://localhost:4000/gatepass/v2/ChiefWarden/blacklistedStudentWise");
  const [data, setData] = useState([]);
  const[tbHeader, setTbHeader] = useState(["Blacklist ID","Student Name", "Enrollment", "Blocked By", "from Date|Time","to Date|Time", "Reason"])
 
  useEffect( () => {
    if (GpDropdown === "Student Wise") {
      setTb_data_Api("http://localhost:4000/gatepass/v2/ChiefWarden/blacklistedStudentWise");
      setTbHeader(["Blacklist ID","Student Name", "Enrollment", "Blocked By", "from Date|Time","toDate|Time", "Reason"])
      setShowStudentWise(true);
      setShowGroupWise(false);
    } else {
      setTb_data_Api("http://localhost:4000/gatepass/v2/ChiefWarden/blacklistedGroupWise");
      setTbHeader(["Blacklist ID","Group", "Sub Group", "Blocked By", "from Date|Time","toDate|Time"])
      setShowStudentWise(false);
      setShowGroupWise(true);
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
      <div className="bg-background flex justify-between px-4 py-4 flex-col sm:flex-row sm:items-start">
      <div className="flex-1 ">
        <Table data={data} tbHeader={tbHeader} showStudentWise={showStudentWise} showGroupWise={showGroupWise} />
        </div>
        <div className="flex-1">
        <BlockedForm/>
      </div>
      </div>
    </div>
  );
};

export default ChiefWardenBlocked;
