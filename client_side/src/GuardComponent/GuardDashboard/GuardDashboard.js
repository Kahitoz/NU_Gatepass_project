import React from "react";
import GuardNavbar from "../GuardSkeleton/G1_Navbar";
import GuardSubNavbar from "../GuardSkeleton/G2_SubNavbar";

const GuardDashboard = () => {
  return (
    <div>
      <div>
        <GuardNavbar />
      </div>
      <div>
        <GuardSubNavbar/>
      </div>
    </div>
  );
};

export default GuardDashboard;
