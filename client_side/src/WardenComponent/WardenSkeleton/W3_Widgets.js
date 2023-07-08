import designs from "../WardenStyling/W3_WidgetsCSS"
const W3_Widgets = ({setGpDropdown,dropdownValues,pendingRequests}) => {
 
  return (
    <div className={`${designs.d1}`}>
      <div className={`${designs.d2 }`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
            <select name="GatepassDropdown" onChange={(e) => setGpDropdown(e.target.value)}>
              { dropdownValues.map((value) => (
                <option value={value} key={value}>{value}</option>
              ))}
            </select>
      </div>
    
      </div>

      <div className={`${designs.d2}`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
         <h1 className={`font-bold me-2`}>Students on Campus:</h1>
         <p>00</p>
      </div>
      </div>

      <div className={`${designs.d2}`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
         <h1 className={`font-bold me-2`}>My Pending Requests:</h1>
         <p >{pendingRequests}</p>
      </div>
       
      </div>
    </div>
  );
};
export default W3_Widgets;
