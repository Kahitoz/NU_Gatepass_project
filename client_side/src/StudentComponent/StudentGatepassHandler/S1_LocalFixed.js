import {week} from "./S7_ParameterConfig";
import {useState} from "react";

//check black list starts here
const checkBlacklist = async function (accessToken) {
  const response = await fetch(
      "http://127.0.0.1:4000/gatepass/v2/student/blacklisted/",
      {
        headers: {
          Authorization: accessToken,
        },
      }
  );
  const jsonResponse = await response.json();
  return jsonResponse.blacklisted;
};

export { checkBlacklist };
// check black list ends here



const checkTime = async (accessToken, departureTime, arrivalTime) => {
  let currentTime = "";
  const response = await fetch(
      "http://127.0.0.1:4000/gatepass/v2/student/get_dates",
      {
        headers: { Authorization: accessToken },
      }
  );
  const jsonResponse = await response.json();
  currentTime = jsonResponse.currentTime;

  if (departureTime <= currentTime && currentTime <= arrivalTime) {
    return true;
  } else {
    return false;
  }
};
export {checkTime}

const checkApprovedOrCheckedout = async (accessToken) => {
  const response = await fetch(
      "http://127.0.0.1:4000/gatepass/v2/student/get_bool_student_checkedout_autoapproved/",
      {
        headers: {
          Authorization: accessToken,
        },
      }
  );
  const jsonResponse = await response.json();
  return jsonResponse.row_affected;
};
export {checkApprovedOrCheckedout}


const checkLocalFixed = async (accessToken, departureTime, arrivalTime) => {
    try {
        const res1 = await checkTime(accessToken, departureTime, arrivalTime);
        const res3 = await checkBlacklist(accessToken);
        const res4 = await checkApprovedOrCheckedout(accessToken);

        const json = await week(accessToken);
        const weekLimit = json.weekLimit;
        console.log("This is the week limit - ", weekLimit);

        let localFixedUsed;
        const localFixedUsedPromise = fetchData_GP_used(accessToken);
        console.log(localFixedUsedPromise);
        const result = await localFixedUsedPromise;
        localFixedUsed = result;

        if (res3 === true) {
            alert("Cannot Apply: You are blacklisted, you cannot apply for Gatepass");
            return false;
        } else if (localFixedUsed >= weekLimit) {
            alert("Cannot Apply: You have exhausted all your weekly Local Fixed Gatepass");
            console.log("total lf-used = ", localFixedUsed, weekLimit);
            return false;
        } else if (res4 !== 0) {
            alert("Cannot Apply: You have already applied for a Local Fixed Gatepass");
            return false;
        } else if (res1 === false) {
            alert("Cannot Apply: You cannot apply a gatepass in the outside hours");
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error("Error fetching local fixed data:", error);
        throw error;
    }
};

export { checkLocalFixed };


const applyLocalFixedGatepass = async (
    accessToken,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    weekLimit
) => {
  let localFixedUsed = 0;

  const applyLocalFixedGatepassAPI = async () => {
    const fetchData = fetch(
        "http://127.0.0.1:4000/gatepass/v2/student/apply_local_fixed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          body: JSON.stringify({
            punch_id: null,
            from_date: departureDate,
            from_time: departureTime,
            to_date: arrivalDate,
            to_time: arrivalTime,
          }),
        }
    )
        .then((response) => response.json())
        .catch((error) => console.log("error: " + error));
    return fetchData;
  };

  const handleClick = async (event) => {

    const check = await checkLocalFixed(
        accessToken,
        departureTime,
        arrivalTime,
        localFixedUsed,
        weekLimit
    );

    if (check === true) {
      await applyLocalFixedGatepassAPI();
    }
  };

  await handleClick();
};


const functions = {
  "applyLocalFixedGatepass":applyLocalFixedGatepass,
  "checkApprovedOrCheckedout":checkApprovedOrCheckedout,
  "checkTime":checkTime,
  "checkBlacklist":checkBlacklist,
  "checkLocalFixed":checkLocalFixed
}
export default functions;


const fetchData_GP_used = async (accessToken) => {
  let currentDate = null;
  let lastMonday = null;
  let nextMonday = null;
  let lf_used = null;
  await fetch("http://127.0.0.1:4000/gatepass/v2/student/get_dates", {
    headers: { Authorization: accessToken },
  })
      .then((Response) => Response.json())
      .then((response) => {
        currentDate = response.currentDate;
        lastMonday = response.lastMonday;
        nextMonday = response.nextMonday;

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
        lf_used = response;
      })
      .catch((err) => console.log("error:", err));

  return lf_used;
};

export {fetchData_GP_used};


