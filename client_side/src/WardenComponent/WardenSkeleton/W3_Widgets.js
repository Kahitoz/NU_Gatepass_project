import designs from "../WardenStyling/W3_WidgetsCSS"
const W3_Widgets = ({setGpDropdown}) => {
  const dropdown_values=["MyGatepassRequest","OthersGatepassRequest"];
  return (
    <div className={`${designs.d1}`}>
      <div className={`${designs.d2 }`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
            <select name="GatepassDropdown" onChange={(e) => setGpDropdown(e.target.value)}>
                <option value={dropdown_values[0]}>My Gatepass Request</option>
                <option value={dropdown_values[1]}>Others Gatepass Request</option>
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
         <p >00</p>
      </div>
       
      </div>
    </div>
  );
};
export default W3_Widgets;
