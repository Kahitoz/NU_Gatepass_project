import React, { useState,useEffect } from "react";
import GuardNavbar from "../GuardSkeleton/G1_Navbar";
import GuardSubNavbar from "../GuardSkeleton/G2_SubNavbar";
import GuardTable from "../GuardSkeleton/G3_Table"
const GuardDashboard = () => {
  const [Suboption, setSubOption] = useState("checkout")
  const [option, setOption] = useState("Students")
  useEffect(() => {setSubOption('checkout')},[option])
  return (
    <div className="bg-background w-screen h-screen">
      <div >
        <GuardNavbar setOption={setOption}/>
      </div>
      <div>
        <GuardSubNavbar setSubOption={setSubOption}/>
      </div>
      <div>
        <GuardTable NavOption={option} SubNavOption={Suboption}/>
      </div>
    </div>
  );
};

export default GuardDashboard;
