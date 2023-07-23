import React, { useEffect, useState } from "react";
import Navbar from "../ChiefWardenSkeleton/CW1_Navbar";
import SubNavbar from "../ChiefWardenSkeleton/CW2_SubNavbar";
import Table from "../ChiefWardenSkeleton/CW4_tableComponents/CW4_5_TowerAllot"
import Cookies from "js-cookie";
import TowerAllotForm from "../ChiefWardenSkeleton/CW5_TowerAllotForm"

const ChiefWardenTowerAllot = () => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const tabs=[];
  const [Tb_data_Api, setTb_data_Api] = useState("http://localhost:4000/gatepass/v2/ChiefWarden/getAllottedTowersReport");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
 
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await fetch(Tb_data_Api, {
          headers: {
            Authorization: accessToken,
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [refresh,Tb_data_Api,accessToken])

  return (
    <div className="w-screen h-screen bg-background">
      <div>
        <Navbar />
      </div>
      <div className="h-20 bg-Navbar_bg">
        <SubNavbar tabs={tabs} />
      </div>
      {/* <div>
        <Widgets setGpDropdown={setGpDropdown} dropdownValues={dropdownValues} />
      </div> */}
      <div className="bg-background flex justify-between px-4 py-4 flex-col sm:flex-row sm:items-start">
      <div className="flex-1 ">
        <Table data={data}  />
        </div>
        <div className="flex-1">
        <TowerAllotForm refresh={refresh} setrefresh={setRefresh}/>
      </div>
      </div>
    </div>
  );
};

export default ChiefWardenTowerAllot;
