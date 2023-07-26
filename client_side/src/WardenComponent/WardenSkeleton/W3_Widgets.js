import { useEffect,useState } from "react";
import designs from "../WardenStyling/W3_WidgetsCSS"
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
const W3_Widgets = ({setGpDropdown,dropdownValues,pendingRequests}) => {
  const userToken = Cookies.get("ACCESS_TOKEN");
  const [totalStudents, setTotalStudents] = useState(0);
  const current= useLocation().pathname;
  useEffect(() => {
         fetch(
        `http://127.0.1:4000/gatepass/v2/admin/student_in_campus`,
        {
          headers: {
            Authorization: userToken,
          },
        }
      ).then((response) => {
        return response.json();
      })
      .then((text) => {
        setTotalStudents(text);
      });
  

}, []);
 
  return (
    <div className={`${designs.d1}`}>
      <div className={`${designs.d2 }`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
            { current==='/Warden/home/ApprovedCancelled' ?
              <select name="GatepassDropdown" onChange={(e) => setGpDropdown(e.target.value)}>
              { dropdownValues.map((value) => (
                <option value={value} key={value}>{value}</option>
              ))}
            </select>
              :
              dropdownValues.map((value) => (
                <div key={value} className="ms-1 me-1">
                <input
                type='radio'
                name='GatepassDropdown'
                className="text-center ms-1 me-1" 
                value={value} 
                onClick={(e)=>setGpDropdown(e.target.value)}/>
                <label className="text-center" >{value}</label>
                </div>
              ))}
      </div>
    
      </div>

      <div className={`${designs.d2}`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
         <h1 className={`font-bold me-2`}>Students on Campus:</h1>
         <p>{totalStudents}</p>
      </div>
      </div>

      {current==='/Warden/home' && <div className={`${designs.d2}`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
         <h1 className={`font-bold me-2`}>My Pending Requests:</h1>
         <p >{pendingRequests}</p>
      </div>
       
      </div>}
    </div>
  );
};
export default W3_Widgets;
