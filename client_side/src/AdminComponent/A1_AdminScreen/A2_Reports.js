import React from "react";
import Navbar from "../A2_AdminSkeletion/A1_Navbar";
import SubNavbar from "../../StudentComponent/StudentSkeleton/S2_SubNavbar";
import ReportField from "../../WardenComponent/WardenSkeleton/W6_ReportField";
import Table from "../../WardenComponent/WardenSkeleton/W4_tableComponents/W4_3_ReportsTable";
const A2_Reports = () => {
    const tabs = ["", ""];
    return (
        <div className="bg-background w-screen h-screen">
            <div>
                <Navbar />
            </div>
            <div>
                <SubNavbar tabs={tabs} />
            </div>
            <div className="bg-background flex justify-between px-4 py-4 flex-col sm:flex-row sm:items-start">
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
export default A2_Reports;
