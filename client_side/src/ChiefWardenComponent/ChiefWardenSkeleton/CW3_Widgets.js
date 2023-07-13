import designs from "../ChiefWardenStyling/CW3_WidgetsCSS"
import { useEffect,useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
const W3_Widgets = ({setGpDropdown,dropdownValues,totalPending}) => {
  const userToken = Cookies.get("ACCESS_TOKEN");
  const [totalStudents, setTotalStudents] = useState(0);
  const current=useLocation().pathname;
  // console.log(current);
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
            <select name="GatepassDropdown" onChange={(e) => setGpDropdown(e.target.value)}>
              { dropdownValues.map((value) => (
                <option className="text-center" value={value} key={value}>{value}</option>
              ))}
            </select>
      </div>
    
      </div>

      <div className={`${designs.d2}`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
         <h1 className={`font-bold me-2`}>Students on Campus:</h1>
         <p>{totalStudents}</p>
      </div>
      </div>

      {current==='/ChiefWarden/home' && <div className={`${designs.d2}`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
         <h1 className={`font-bold me-2`}>Total Pending Requests:</h1>
         <p >{totalPending}</p>
      </div>
      </div>}
      {current==='/ChiefWarden/home/AutoApproved' && <div className={`${designs.d2}`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
         <h1 className={`font-bold me-2`}>Currently AutoApproved Batches:</h1>
         <p >00</p>
      </div>
      </div>}
      {current==='/ChiefWarden/home/Blocked' && <div className={`${designs.d2}`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
         <h1 className={`font-bold me-2`}>Currently Blocked Students:</h1>
         <p >{totalPending}</p>
      </div>
      </div>}
    </div>
  );
};
export default W3_Widgets;
