import designs from "../GuardStyling/G3_TableCSS";
import { useState } from "react";
import { useEffect } from "react";

const G3_table = (props) => { 
  useEffect(()=>{
    if (props.NavOption === "Students") {
      if(props.SubNavOption === "checkout"){
        alert("checkout Students")
  }
  if(props.SubNavOption === "checkin"){
    alert("checkin Students")
}
}
if (props.NavOption === "Visitors") {
  if(props.SubNavOption === "checkout"){
    alert("checkout Visitors")
}
if(props.SubNavOption === "checkin"){
alert("checkin Visitors")
}
}
},[props.NavOption,props.SubNavOption])

  return (
    <div className="bg-background">
      <div>
        <div className={`${designs.d1}`}>
          <div className={`${designs.d2}`}>
            <h1 className={`${designs.d5}`}>Student Name</h1>
            <h1 className={`${designs.d5}`}>Enrollment</h1>
            <h1 className={`${designs.d5}`}>Gatepass Type</h1>
            <h1 className={`${designs.d5}`}>Applied Date/Time</h1>
            <h1 className={`${designs.d5}`}>Actions</h1>
          </div>
        </div>

        <div className={`${designs.d3}`}>
          <div className={`${designs.d4}`}>
            <h1 className={`${designs.d5}`}>Karam Arora</h1>
            <h1 className={`${designs.d5}`}>BT20HCS210</h1>
            <h1 className={`${designs.d5}`}>Local Fixed</h1>
            <h1 className={`${designs.d5}`}>23 Tueday, 5:30pm</h1>
            <h1 className={`${designs.d5}`}>Checkout</h1>
          </div>
          <div className={`${designs.d4}`}>
            <h1 className={`${designs.d5}`}>Karam Arora</h1>
            <h1 className={`${designs.d5}`}>BT20HCS210</h1>
            <h1 className={`${designs.d5}`}>Local Fixed</h1>
            <h1 className={`${designs.d5}`}>23 Tueday, 5:30pm</h1>
            <h1 className={`${designs.d5}`}>Checkout</h1>
          </div>
          <div className={`${designs.d4}`}>
            <h1 className={`${designs.d5}`}>Karam Arora</h1>
            <h1 className={`${designs.d5}`}>BT20HCS210</h1>
            <h1 className={`${designs.d5}`}>Local Fixed</h1>
            <h1 className={`${designs.d5}`}>23 Tueday, 5:30pm</h1>
            <h1 className={`${designs.d5}`}>Checkout</h1>
          </div>
          <div className={`${designs.d4}`}>
            <h1 className={`${designs.d5}`}>Karam Arora</h1>
            <h1 className={`${designs.d5}`}>BT20HCS210</h1>
            <h1 className={`${designs.d5}`}>Local Fixed</h1>
            <h1 className={`${designs.d5}`}>23 Tueday, 5:30pm</h1>
            <h1 className={`${designs.d5}`}>Checkout</h1>
          </div>
          <div className={`${designs.d4}`}>
            <h1 className={`${designs.d5}`}>Karam Arora</h1>
            <h1 className={`${designs.d5}`}>BT20HCS210</h1>
            <h1 className={`${designs.d5}`}>Local Fixed</h1>
            <h1 className={`${designs.d5}`}>23 Tueday, 5:30pm</h1>
            <h1 className={`${designs.d5}`}>Checkout</h1>
          </div>
          <div className={`${designs.d4}`}>
            <h1 className={`${designs.d5}`}>Karam Arora</h1>
            <h1 className={`${designs.d5}`}>BT20HCS210</h1>
            <h1 className={`${designs.d5}`}>Local Fixed</h1>
            <h1 className={`${designs.d5}`}>23 Tueday, 5:30pm</h1>
            <h1 className={`${designs.d5}`}>Checkout</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default G3_table;
