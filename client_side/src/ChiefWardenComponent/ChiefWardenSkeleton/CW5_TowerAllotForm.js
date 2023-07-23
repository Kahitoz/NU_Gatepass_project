import designs from "../ChiefWardenStyling/CW6_wardenWiseGatepassCSS";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const CW9_TowerAllotForm = ({refresh,setrefresh}) => {
 const [api, setApi] = useState('');
 const [hostelTowers,setHostelTowers]=useState([]);
 const [wardens,setWardens]=useState([]);
 const current=useLocation().pathname;
 const [selectedtowerID,setSelectedTowerID]=useState(0);
 const [selectedhostel,setSelectedHostel]=useState('UG 1');
  const [selectedwarden,setSelectedWarden]=useState([]);

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

const handleClick=async(event)=>{
  let url=`http://localhost:4000/gatepass/v2/ChiefWarden/insertTowerWarden`;
  
  try
  {const [warden_id,warden_name]= selectedwarden.split(',');
    console.log(warden_id,warden_name,selectedtowerID,selectedhostel);
    const response=await fetch(url,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
      'Authorization':Cookies.get('ACCESS_TOKEN')
    },
    body:JSON.stringify({
      'hostel_name':selectedhostel,
      'hostel_id':selectedtowerID,
      'warden_id':warden_id,
      'warden_name':warden_name
    })
  }
  );
  alert(`warden ${warden_name} has been alloted the tower`)
}
catch(err){
  console.log(err);
}
setrefresh(!refresh);

}

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
          <div name='TowerAllotForm' className="p-5"  >
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
              onClick={async (e)=>{setSelectedTowerID(e.target.value)}}
            >
              { hostelTowers.map((item,idx)=>(
                <option value={item.masterhostal_id}  key={item.mastertowername} > {item.mastertowername}</option>
              ))}
            </select>

            <label htmlFor="setWarden"> select warden</label> 
           <select
           id='wardenSelect'
              className={`${designs.d13} `}
              onClick={async (e)=>{setSelectedWarden(e.target.value);}}
            >
              {wardens.map((item,idx)=>(
                <option value={[item.user_id,item.warden_name]} key={item.user_id} > {item.warden_name}</option>
              ))}
            </select>
            </div>
            <button  className={`bg-Navbar_bg text-background m-2 ml-6  p-2 px-4 rounded-md hover:cursor-pointer active:-translate-y-0.5 active:-translate-x-0.5`} 
            onClick={(event) => handleClick(event)}
            > Insert </button>
            </div>
            </div>
            </div>
  );
};

export default CW9_TowerAllotForm;
