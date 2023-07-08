import React from "react";
import StudentNavbar from "../StudentSkeleton/S1_Navbar";
import StudentSubNavbar from "../StudentSkeleton/S2_SubNavbar";
import Widgets from "../StudentSkeleton/S3_Widgets";
import Table from "../StudentSkeleton/S4_Table";
import Profile from "../StudentSkeleton/S5_Profile";
import designs from "../StudentStyling/S0_ScreenCSS";

const StudentDashboard = () => {
  return (
    <div className={`${designs.d1}`}>
      <div>
        <StudentNavbar />
      </div>
      <div>
        <StudentSubNavbar />
      </div>
      <div>
        <Widgets />
      </div>
      <div className={`${designs.d2}`}>
        <div className={`${designs.d3}`}>
          <Table />
        </div>
        <div className={`${designs.d3}`}>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
