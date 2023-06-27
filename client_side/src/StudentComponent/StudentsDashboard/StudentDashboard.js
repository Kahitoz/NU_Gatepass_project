import React from "react";
import StudentNavbar from "../StudentSkeleton/S1_Navbar";
import StudentSubNavbar from "../StudentSkeleton/S2_SubNavbar";
import Widgets from "../StudentSkeleton/S3_Widgets";
import Table from "../StudentSkeleton/S4_Table";

const StudentDashboard = () => {
  return (
    <div className="bg-background w-screen h-screen">
      <div>
        <StudentNavbar />
      </div>
      <div>
        <StudentSubNavbar />
      </div>
      <div>
        <Widgets />
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
};

export default StudentDashboard;
