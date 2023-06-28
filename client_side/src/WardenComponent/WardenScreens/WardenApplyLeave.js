import React from "react";
import Navbar from "../WardenSkeleton/W1_Navbar";
import SubNavbar from "../WardenSkeleton/W2_SubNavbar";
import LeaveForm from "../WardenSkeleton/W5_LeaveForm"

const WardenApplyLeave = () => {
  const tabs=["Apply Leave","Warden Leave Management"];
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <SubNavbar tabs={tabs}/>
      </div>
      <div>
      <LeaveForm/>
      </div>
    </div>
  );
};

export default WardenApplyLeave;
