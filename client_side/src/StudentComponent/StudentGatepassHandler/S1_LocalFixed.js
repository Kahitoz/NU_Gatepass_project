//check black list starts here

var checkBlacklist = async function (accessToken) {
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


const checkLocalFixed = async (
  accessToken,
  departureTime,
  arrivalTime,
  localFixedUsed,
  weekLimit
) => {
  const res1 = await checkTime(accessToken, departureTime, arrivalTime);
  const res3 = await checkBlacklist(accessToken);
  const res4 = await checkApprovedOrCheckedout(accessToken);

  if (res3 === true) {
    alert("Cannot Apply: You are blacklisted, you cannot apply for Gatepass");
    return false;
  } else if (localFixedUsed >= weekLimit) {
    alert(
      "Cannot Apply: You have exhausted all your weekly Local Fixed Gatepass "
    );
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
};
export {checkLocalFixed}

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
    event.preventDefault();
    const check = await checkLocalFixed(
      accessToken,
      departureTime,
      arrivalTime,
      localFixedUsed,
      weekLimit
    );

    if (check === true) {
      await applyLocalFixedGatepassAPI();
      alert("You have successfully applied for Local Fixed Gatepass!");
    }
  };

  handleClick();
};

const functions = {
  "applyLocalFixedGatepass":applyLocalFixedGatepass,
  "checkApprovedOrCheckedout":checkApprovedOrCheckedout,
  "checkTime":checkTime,
  "checkBlacklist":checkBlacklist,
  "checkLocalFixed":checkLocalFixed
}
export default functions;


