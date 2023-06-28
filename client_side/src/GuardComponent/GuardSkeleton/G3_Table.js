import designs from "../GuardStyling/G3_TableCSS";
import { useState, useEffect } from "react";
import moment from "moment";
import Cookies from "js-cookie";

const G3_table = (props) => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const [data, setData] = useState([]);
  const [pgNo, setPgNo] = useState(0);
  const [TbData, setTbData] = useState([data.slice(5)]);
  //const url = "http://localhost:4000/gatepass/v2/guard/approved_students";

  let url='';
  useEffect(()=>{
    if (props.NavOption === "Students") {
      if(props.SubNavOption === "Check Out"){
        url="http://localhost:4000/gatepass/v2/guard/approved_students"
  }
      if(props.SubNavOption === "Check In"){
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
    setPgNo(1)
  }, [accessToken, props.SubNavOption]);

  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  useEffect(() => { setTbData(paginate(data,5,pgNo))},[pgNo,data]);

  return (
    <div className="bg-background">
      <div className="flex justify-center">
      </div>
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
          {TbData.map((item, idx) => (
            <div className={`${designs.d4}`} key={idx}>
              <h1 className={`${designs.d5} `}>{item.name}</h1>
              <h1 className={`${designs.d5}`}>{item.user_id}</h1>
              <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
              <h1 className={`${designs.d5}`}>
                {moment(item.from_date).format("YYYY-MM-DD")}
              </h1>
              <h1 className={`${designs.d5}`}>{moment(item.from_time).format("HH:mm:ss")}</h1>
              <h1 className={`${designs.d5}`}>
                <button id="button2" name={item.request_id} className=" bg-Navbar_bg p-2 text-white hover:border-2">
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
