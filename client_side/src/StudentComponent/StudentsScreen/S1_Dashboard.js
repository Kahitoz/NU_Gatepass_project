import React from "react";
import StudentNavbar from "../StudentSkeleton/S1_Navbar";
import StudentSubNavbar from "../StudentSkeleton/S2_SubNavbar";
import Widgets from "../StudentSkeleton/S3_Widgets";
import Table from "../StudentSkeleton/S4_Table";
import Profile from "../StudentSkeleton/S5_Profile";

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
      <div className="bg-background flex justify-between px-4 py-4 flex-col sm:flex-row sm:items-start">
        <div className="flex-1">
          <Table />
        </div>
        <div className="flex-1">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
