import designs from "../GuardStyling/G3_TableCSS";
import { useState, useEffect } from "react";
import moment from "moment";
import Cookies from "js-cookie";

const G3_table = (props) => { 
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const [data, setData] = useState([]);
  let url='';
  useEffect(()=>{
    if (props.NavOption === "Students") {
      if(props.SubNavOption === "checkout"){
        url="http://localhost:4000/gatepass/v2/guard/approved_students"
  }
      if(props.SubNavOption === "checkin"){
        url="http://localhost:4000/gatepass/v2/guard/checked_out_students"
    }
}
// if (props.NavOption === "Visitors") {
//   if(props.SubNavOption === "checkout"){
//     url="http://localhost:4000/gatepass/v2/guard/approved_students"
// }
//   if(props.SubNavOption === "checkin"){
//     url="http://localhost:4000/gatepass/v2/guard/approved_students"
// }
},[props.NavOption,props.SubNavOption])



  useEffect(() => {
    // Replace this with your actual data retrieval logic
    const fetchData = async () => {
      // Example: Fetch data from an API endpoint
      const response = await fetch(url, {
        headers: {
          Authorization: accessToken,
        },
      }).then((response) => {
        setData(response.json())
      })
      
    };

    fetchData();
  }, [props.NavOption,props.SubNavOption]);



  return (
    <div className="bg-background">
      <div>
        <div className={`${designs.d1}`}>
          <div className={`${designs.d2}`}>
            <h1 className={`${designs.d5}`}>Name</h1>
            <h1 className={`${designs.d5}`}>Enrollment</h1>
            <h1 className={`${designs.d5}`}>Gatepass Type</h1>
            <h1 className={`${designs.d5}`}>Applied Date</h1>
            <h1 className={`${designs.d5}`}>Applied Time</h1>
            <h1 className={`${designs.d5}`}>Actions</h1>
          </div>
        </div>

        <div className={`${designs.d3}`}>
          {data.map((item, idx) => (
            <div className={`${designs.d4}`} key={idx}>
              <h1 className={`${designs.d5}`}>{item.name}</h1>
              <h1 className={`${designs.d5}`}>{item.user_id}</h1>
              <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
              <h1 className={`${designs.d5}`}>{moment(props.actual_out_date)
                          .utc()
                          .format("YYYY-MM-DD")}{" "}</h1>
              <h1 className={`${designs.d5}`}>{item.remarks}</h1>
              <h1 className={`${designs.d5}`}><button
                          id="button2"
                          name={item.request_id}
                        > {props.SubNavOption}
                        </button></h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default G3_table;
