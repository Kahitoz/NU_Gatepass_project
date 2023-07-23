import designs from "../ChiefWardenStyling/CW6_wardenWiseGatepassCSS";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const CW9_TowerAllotForm = () => {
 const [api, setApi] = useState('');
 const[masterGroup,setMasterGroup]=useState('');
 const [selectedhostel,setSelectedHostel]=useState('UG 1');
 const [hostelTowers,setHostelTowers]=useState([]);
 const [wardens,setWardens]=useState([]);
 const current=useLocation().pathname;

  useEffect(() => {
  const fetchTowers=async()=>{
    let url=`http://localhost:4000/gatepass/v2/ChiefWarden/getHostelTowers/${selectedhostel}`;
    const response=await fetch(url,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':Cookies.get('ACCESS_TOKEN')
      }
    }
    );
    const data=await response.json();
    
    setHostelTowers(data)
  }
  fetchTowers();
}, [selectedhostel]);

useEffect(() => {
  const fetchWardens=async()=>{
    let url=`http://localhost:4000/gatepass/v2/ChiefWarden/getAllWardens`;
    const response=await fetch(url,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':Cookies.get('ACCESS_TOKEN')
      }
    }
    );
    const data=await response.json();
    let notincluded=['Chief Warden Girls','AutoApprove'];
    setWardens(data.filter((item) => !notincluded.includes(item.warden_name)));
  }
  fetchWardens();
},[]);

  return (
    <div className={`${designs.d1}`}>
      {/* <div className={`${designs.d2}`}>
        <div className={`${designs.d3}`}>
          <div className={`${designs.d4}`}>
            <div className={`${designs.d7}`}>
              <div className={`${designs.d8}`}>
                <button className={`${designs.d9}`}>Request Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className={`${designs.d10}`}>
        <div  className={`${designs.d12}`}>
          <form name='TowerAllotForm' className="p-5" >
           <label htmlFor="setHostel"> Select Hostel</label> 
           <select
           id='masterHostal'
              className={`${designs.d13} `}
              onClick={async (e)=>setSelectedHostel(e.target.value)}
            >
              <option value='UG 1' > UG 1</option>
              <option value='UG 2' > UG 2</option>
              <option value='PG 1' > PG 1</option>
              <option value='PG 2' > PG 2</option>
            </select>

            <label htmlFor="setTower"> Select Tower</label> 
           <select
           id='masterGroup'
              className={`${designs.d13} `}
              onClick={async (e)=>setMasterGroup(e.target.value)}
            >
              { hostelTowers.map((item,idx)=>(
                <option value={item.mastertowername}  key={item.mastertowername} > {item.mastertowername}</option>
              ))}
            </select>

            <label htmlFor="setWarden"> select warden</label> 
           <select
           id='masterGroup'
              className={`${designs.d13} `}
              onClick={async (e)=>setMasterGroup(e.target.value)}
            >
              {wardens.map((item,idx)=>(
                <option value={{'user_id':item.user_id,'warden_name':item.warden_name}} key={item.user_id} > {item.warden_name}</option>
              ))}
            </select>
            </form>
            <button className={`bg-Navbar_bg text-background m-2 ml-6  p-2 px-4 rounded-md`}>Insert</button>
            </div>
            </div>
            </div>
  );
};

export default CW9_TowerAllotForm;
