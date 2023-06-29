import React from "react";
import Navbar from "../WardenSkeleton/W1_Navbar";
import SubNavbar from "../WardenSkeleton/W2_SubNavbar";
import ReportField from "../WardenSkeleton/W6_ReportField";
import Table from "../WardenSkeleton/W4_Table";
const WardenReports = () => {
  const tabs = ["", ""];
  return (
    <div className="bg-background w-screen h-screen">
      <div>
        <Navbar />
      </div>
      <div>
        <SubNavbar tabs={tabs} />
      </div>
      <div className="bg-background flex justify-between px-4 py-4 flex-col sm:flex-row sm:items-center">
        <div className="flex-1">
          <ReportField />
        </div>
        <div className="flex-1">
          <Table />
        </div>
      </div>
    </div>
  );
};
export default WardenReports;
