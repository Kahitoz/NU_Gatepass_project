import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const S1_LocalFixed = (props) =>{
    const accessToken = Cookies.get("ACCESS_TOKEN");
    const [localFixedUsed, setLocalFixedUsed] = useState(0);
    const [lastMondayDate, setLastMondayDate] = useState("0000-00-00");
    const [nextMondayDate, setNextMondayDate] = useState("0000-00-00");
    const [currentDate, setCurrentDate] = useState("");
  
    useEffect(() => {
      let currentDate = "";
      let lastMonday = "";
      let nextMonday = "";

      
  
      const fetchData = async () => {
        await fetch("http://127.0.0.1:4000/gatepass/v2/student/get_dates", {
          headers: { Authorization: accessToken },
        })
          .then((Response) => Response.json())
          .then((response) => {
            currentDate = response.currentDate;
            lastMonday = response.lastMonday;
            nextMonday = response.nextMonday;
            setCurrentDate(response.currentDate);
            setLastMondayDate(response.lastMonday);
            setNextMondayDate(response.nextMonday);
          });
        await fetch(
          "http://127.0.0.1:4000/gatepass/v2/student/get_number_of_local_fixed_student/" +
            `${lastMonday}/` +
            `${nextMonday}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
          .then((Response) => Response.text())
          .then((response) => {
            setLocalFixedUsed(response);
          })
          .catch((err) => console.log("error:", err));
      };
      fetchData();
    }, []);
  
    const getDates = () => {
      fetch("http://localhost:4000/gatepass/v2/student/get_dates")
        .then((Response) => Response.json())
        .then((response) => {
          setLastMondayDate(response.lastMonday);
          setNextMondayDate(response.nextMonday);
        });
    };
  
    const checkBlacklist = async () => {
      let res = {};
      const fetchData = await fetch(
        "http://127.0.0.1:4000/gatepass/v2/student/blacklisted/",
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
        .then((Response) => Response.json())
        .then((response) => {
          res = response;
          return response.blacklisted;
        })
        .catch((err) => console.log("error:", err));
      return fetchData;
    };
  
    const checkTime = () => {
      let currentTime = "";
      fetch("http://127.0.0.1:4000/gatepass/v2/student/get_dates", {
        headers: { Authorization: accessToken },
      })
        .then((Response) => Response.json())
        .then((response) => {
          currentTime = response.currentTime;
        });
      if (
        props.departureTime <= currentTime &&
        currentTime <= props.arrivalTime
      ) {
        return true;
      } else {
        return false;
      }
    };
}


export default S1_LocalFixed;