import React, { useEffect } from "react";
import Navbar from "../WardenSkeleton/W1_Navbar";
import SubNavbar from "../WardenSkeleton/W2_SubNavbar";
import Widgets from "../WardenSkeleton/W3_Widgets"
import Table from "../WardenSkeleton/W4_Table"
import { useState } from "react";

const WardenDashboard = () => {
  const [subNavOption,setSubNavOption]=useState("")
  const[GpDropdown,setGpDropdown]=useState("MyGatepassRequest") // MyGatepassRequest or OthersGatepassRequest 
  const tabs=["Pending Requests","Approved / Cancelled","AutoApproved","Visitor Requests"]
  
  return (
    <div className="w-screen h-screen bg-background">
      <div>
        <Navbar  />
      </div>
      <div>
        <SubNavbar tabs={tabs} setSubNavOption={setSubNavOption}  />
      </div>
      <div>
      <Widgets setGpDropdown={setGpDropdown} subNavOption={subNavOption}/>
      </div>
      <div>
        <Table subNavOption={subNavOption} GpDropdown={GpDropdown}/>
      </div>
    </div>
  );
};

export default WardenDashboard;
