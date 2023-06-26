import React from "react";
import StudentNavbar from "../StudentSkeleton/S1_Navbar";
import StudentSubNavbar from "../StudentSkeleton/S2_SubNavbar";

const StudentDashboard = () => {
  return (
    <div>
      <div>
        <StudentNavbar />
      </div>
      <div>
        <StudentSubNavbar/>
      </div>
    </div>
  );
};

export default StudentDashboard;
