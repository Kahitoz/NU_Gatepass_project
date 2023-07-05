import React, { useRef, useState,useEffect } from "react";
import GuardNavbar from "../GuardSkeleton/G1_Navbar";
import GuardSubNavbar from "../GuardSkeleton/G2_SubNavbar";
import GuardTable from "../GuardSkeleton/G3_Table"
import Cookies from "js-cookie";
const GuardDashboard = () => {
  
  const [Suboption, setSubOption] = useState("Check Out")
  const [option, setOption] = useState("Students")
  const [search,setSearch] = useState("")
  
  const handleChange = (e) => {
    setSearch(e.target.value)
    
  }
  
  useEffect(() => {setSubOption('Check Out')},[option])
  return (
    <div className="bg-background w-screen h-screen">
      <div >
        <GuardNavbar setOption={setOption}/>
      </div>
      <div>
        <GuardSubNavbar setSubOption={setSubOption} handleChange={handleChange}/>
      </div>
      <div>
        <GuardTable NavOption={option} SubNavOption={Suboption} search={search} />
      </div>
    </div>
  );
};

export default GuardDashboard;
