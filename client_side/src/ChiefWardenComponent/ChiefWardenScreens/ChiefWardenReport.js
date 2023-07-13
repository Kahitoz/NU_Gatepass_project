import React from "react";
import Navbar from "../ChiefWardenSkeleton/CW1_Navbar";
import SubNavbar from "../ChiefWardenSkeleton/CW2_SubNavbar";
import ReportField from "../ChiefWardenSkeleton/CW6_ReportField";
import Table from "../ChiefWardenSkeleton/CW4_tableComponents/CW4_4_ReportsTable";
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
