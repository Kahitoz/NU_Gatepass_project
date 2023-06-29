import React from "react";
import GuardNavbar from "../GuardSkeleton/G1_Navbar";
import GuardSubNavbar from "../GuardSkeleton/G2_SubNavbar";
import GuardTable from "../GuardSkeleton/G3_Table"
const GuardDashboard = () => {
  return (
    <div className="bg-background w-screen h-screen">
      <div >
        <GuardNavbar />
      </div>
      <div>
        <GuardSubNavbar/>
      </div>
      <div>
        <GuardTable/>
      </div>
    </div>
  );
};

export default GuardDashboard;
