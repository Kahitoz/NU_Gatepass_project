import React from "react";
import StudentNavbar from "../StudentSkeleton/S1_Navbar";
import StudentSubNavbar from "../StudentSkeleton/S2_SubNavbar";
import Widgets from "../StudentSkeleton/S3_Widgets"

const StudentDashboard = () => {
  return (
    <div>
      <div>
        <StudentNavbar />
      </div>
      <div>
        <StudentSubNavbar/>
      </div>
      <div>
      <Widgets/>
      </div>
    </div>
  );
};

export default StudentDashboard;
