import React, { useState } from "react";
import Navbar from "../WardenSkeleton/W1_Navbar";
import SubNavbar from "../WardenSkeleton/W2_SubNavbar";
import Table from "../WardenSkeleton/W4_tableComponents/W4_6_LeaveManagementTable"
import Widgets from "../WardenSkeleton/W3_Widgets";
const WardenLeaveManagement = () => {
  const [GpDropdown, setGpDropdown]= useState('All GatePass Requests')
  const dropdownValues=['All GatePass Requests','Warden Requests']
  const [Tb_data_Api, setTb_data_Api] = useState("set Api here");
  const [data, setData] = useState([]);

  const tabs=["Apply Leave","Warden Leave Management"];
  return (
    <div className="w-screen h-screen bg-background">
      <div>
        <Navbar />
      </div>
      <div>
        <SubNavbar tabs={tabs}/>
      </div>
      <div>
      <Widgets dropdownValues={dropdownValues} setGpDropdown={setGpDropdown}/>
      </div>
      <div>
      <Table data={data}/>
      </div>
    </div>
  );
};

export default WardenLeaveManagement;
