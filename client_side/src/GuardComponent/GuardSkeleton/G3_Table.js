import designs from "../GuardStyling/G3_TableCSS";
import { useState, useEffect } from "react";
import moment from "moment";
import Cookies from "js-cookie";

const G3_table = (props) => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const [data, setData] = useState([]);
  //const url = "http://localhost:4000/gatepass/v2/guard/approved_students";

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
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: accessToken,
          },
        });
        const jsonData = await response.json();
        console.log(jsonData); 
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken, props.SubNavOption]);

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
              <h1 className={`${designs.d5} `}>{item.name}</h1>
              <h1 className={`${designs.d5}`}>{item.user_id}</h1>
              <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
              <h1 className={`${designs.d5}`}>
                {moment(item.from_date).format("YYYY-MM-DD")}
              </h1>
              <h1 className={`${designs.d5}`}>{moment(item.from_time).format("HH:mm:ss")}</h1>
              <h1 className={`${designs.d5}`}>
                <button id="button2" name={item.request_id}>
                  {props.SubNavOption}
                </button>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default G3_table;
