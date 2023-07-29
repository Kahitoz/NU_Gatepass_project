import Cookies from "js-cookie";
import designs from "../ChiefWardenStyling/CW5_formCSS";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from 'moment';
const CW5_AutoApprovedBlockedForm = () => {
 const [api, setApi] = useState('');
 const[masterGroups,setMasterGroups]=useState('');
 const [AllGroups,setAllGroups]=useState('');
  const [AllSubGroups,setAllSubGroups]=useState('');
 const[groups,setGroups]=useState('');
 const[subGroups,setSubGroups]=useState('');
 const selectedGroup ={}
 const [selectedMasterGroup,setSelectedMasterGroup]=useState('');
 const selectedSubGroup={}
 const [fromTime,setFromTime]=useState(moment().format('YYYY-MM-DD HH:mm'));
 const [toTime,setToTime]=useState(moment().format('YYYY-MM-DD HH:mm'));
 const [text,setText]=useState('');
 const accessToken = Cookies.get("ACCESS_TOKEN");
 let [mastergroup_id,mastergroup_name]=selectedMasterGroup.split(',')[0];

 const current=useLocation().pathname;
  useEffect(() => {
    if (current==='/ChiefWarden/home/AutoApproved') {
      setApi('set AutoApproved api here')
      setText('Auto Approved')
    }
    else{
      setApi('set Blocked api here')
      setText('Blocked')
    }

  }, [current]);

  useEffect(() => {
    const fetchMasterGroups = async () => {
      try {
        const response = await fetch('http://localhost:4000/gatepass/v2/admin/getAllMasterGroups', {
          headers: {
            Authorization: accessToken ,
          },
        });
        const jsonData = await response.json();
        setMasterGroups(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const fetchAllGroups = async () => {
      try {
        const response = await fetch('http://localhost:4000/gatepass/v2/admin/get_all_groups', {
          headers: {
            Authorization: accessToken ,
          },
        });
        const jsonData = await response.json();
        setAllGroups(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const fetchAllSubGroups = async () => {
      try {
        const response = await fetch('http://localhost:4000/gatepass/v2/admin/get_all_sub_groups', {
          headers: {
            Authorization: accessToken ,
          },
        });
        const jsonData = await response.json();
        setAllSubGroups(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchAllSubGroups();
    fetchAllGroups();
    fetchMasterGroups();

  }, [accessToken]);

  useEffect(() => {
    if(AllGroups.length>1 && AllSubGroups.length>1 && mastergroup_id!=0)
    {setGroups(AllGroups.filter((item)=>item.mastergroup_id==mastergroup_id));
     setSubGroups(AllSubGroups.filter((item)=>item.mastergroup_id==mastergroup_id));
    }
    if(mastergroup_id==0){
      setGroups(AllGroups);
      setSubGroups(AllSubGroups);
    }

    for(const element of groups){
      selectedGroup[element.group_id]=false;
    }
    for(const element of subGroups){
      selectedSubGroup[element.subgroup_id]=false;
    }
  }, [selectedMasterGroup,AllGroups]);

  const handleGroupChecked=async (e)=>{
    
      selectedGroup[e.target.value]=e.target.checked;
      console.log(selectedGroup);
    }
  const handleSubGroupChecked=async (e)=>{
    selectedSubGroup[e.target.value]=e.target.checked;
    console.log(selectedSubGroup);
    }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const data={
      mastergroup_id:mastergroup_id,
      mastergroup_name:mastergroup_name,
      groups:selectedGroup,
      subgroups:selectedSubGroup,
      fromTime:fromTime,
      toTime:toTime
    }
    console.log(data);
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }




  return (
    <div className={`${designs.d1}`}>
      <div className={`${designs.d10}`}>
        <div  className={`bg-background  rounded-lg  center`}>
        <p className={`m-2 text-center font-bold border-b-2 border-black`}>{`Create New ${text} Request`}</p>
          <form name='setAutoApproval/BlockedForm' className="p-5" >
           <label htmlFor="masterGroup"> Master Group</label> 
           <select
           id='masterGroup'
              className={`${designs.d13} `}
              onClick={async (e)=>setSelectedMasterGroup(e.target.value)}
            >
              <option value='none'> None</option>
              {masterGroups.length>1 && masterGroups.map((item,idx)=>(
                <option value={[item.mastergroup_id,item.mastergroup_name]} key={idx}>{item.mastergroup_name}</option>
              ))}
            </select>
            <label className={`${designs.d14}`}>Group </label>
            <div className="flex-wrap rounded-sm border p-2 bg-Items_bg w-96 overflow-auto">
           {groups.length>1 && mastergroup_id!=0 ? groups.map((item,idx)=>(
                <div key={idx}>
                  <div className="flex items-center">
                <input
                  type="checkbox"
                  id='groupCheckbox'
                  className={`m-1`}
                  value={item.group_id}
                  onChange={(e)=>{handleGroupChecked(e);}}
                  /> 
                  <label htmlFor="groupCheckbox" className="overflow:hidden">{item.groupname}</label>
            </div>
            {idx%4==0 && <div className="block"></div>}
            </div>
           )): mastergroup_id==0?<h1 className="text-center">All groups selected</h1>:<h1 className="text-center">No groups</h1>}
            </div>


            <label className={`${designs.d14}`}> Sub Group </label>
            <div className="flex-wrap rounded-sm border p-1 bg-Items_bg ">
           
            {subGroups.length>1 && mastergroup_id!=0? subGroups.map((item,idx)=>(

                <div key={idx}>
                  <div className="flex items-center w-fit">
                <input
                  type="checkbox"
                  id='subGroupCheckbox'
                  className={`m-1`}
                  value={item.subgroup_id}
                  onChange={(e)=>handleSubGroupChecked(e)}
                  />
                  <label htmlFor="subGroupCheckbox" className="overflow:auto">{item.subgroup_name}</label>
            </div>
            </div>
            )): mastergroup_id==0? <h1 className="text-center">All subgroups selected</h1>:<h1 className="text-center">No subgroups</h1>}
            </div>

              <label className={`${designs.d14}`}>From Date Time</label>
            <div className="flex rounded-sm border p-2 bg-Items_bg" >
               <input
               type='datetime-local'
               id='fromDateTime'
               className="w-full bg-transparent"
               disabled={mastergroup_id==='n'}
               required={true}
               value={fromTime}
               onChange={(e)=>setFromTime(moment(e.target.value).format('YYYY-MM-DD HH:mm'))}
               />
            </div>

            <label className={`${designs.d14}`}>To Date Time</label>
            <div className="flex rounded-sm border p-2 bg-Items_bg" >
               <input
               type='datetime-local'
               id='fromDateTime'
               className="w-full bg-transparent"
               disabled={mastergroup_id==='n'}
               required={true}
               value={toTime}
               onChange={(e)=>setToTime(moment(e.target.value).format('YYYY-MM-DD HH:mm'))}
               />
            </div>
          </form>
          {toTime<fromTime && <h1 className="text-center text-xs text-red-700 font-bold">To Datetime must be Greater than from Datetime</h1>}

        <button 
        className={`bg-Navbar_bg text-background m-2 ml-4 p-2 rounded-md`}
        disabled={mastergroup_id==='n'}
        >Confirm Done</button>
        </div>
      </div>
    </div>
  );
};

export default CW5_AutoApprovedBlockedForm;
