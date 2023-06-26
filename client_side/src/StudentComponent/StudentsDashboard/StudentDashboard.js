import React from "react";
import StudentNavbar from "../StudentSkeleton/StudentNavbar";
import StudentSubNavbar from "../StudentSkeleton/StudentSubNavbar";

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
