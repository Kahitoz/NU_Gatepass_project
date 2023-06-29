import React from "react";
import Navbar from "../WardenSkeleton/W1_Navbar";
import SubNavbar from "../WardenSkeleton/W2_SubNavbar";
import Widgets from "../WardenSkeleton/W3_Widgets"
import Table from "../WardenSkeleton/W4_Table"

const WardenDashboard = () => {
  const tabs=["Pending Requests","Approved","Cancelled","Visitor Requests","AutoApproved"]
  return (
    <div>
      <div>
        <Navbar  />
      </div>
      <div>
        <SubNavbar tabs={tabs}/>
      </div>
      <div>
      <Widgets/>
      </div>
      <div>
        <Table/>
      </div>
    </div>
  );
};

export default WardenDashboard;
