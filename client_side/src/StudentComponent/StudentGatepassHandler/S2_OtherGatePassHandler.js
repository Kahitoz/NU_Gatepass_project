const get_warden_details = async function (accessToken) {
  const response = await fetch(
    "http://localhost:4000/gatepass/v2/student/get_warden_details",
    {
      headers: { Authorization: accessToken },
    }
  );
  const jsonResponse = await response.json();
  return jsonResponse;
};

export { get_warden_details };

const check_black_list = async function (accessToken) {
  const response = await fetch(
    "http://127.0.0.1:4000/gatepass/v2/student/blacklisted",
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  const jsonResponse = response.blacklisted;
  return jsonResponse;
};

export { check_black_list };

const check_status = async function (accessToken) {
  const response = await fetch(
    "http://127.0.0.1:4000/gatepass/v2/student/get_gatepass_status_for_localflexible",
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  const jsonRespone = response.json();
  return jsonRespone;
};

export { check_status };

const check_time = async function (accessToken, startTime, lastTime, departureTime) {
  let currentTime = "";
  const response = fetch(
    "http://localhost:4000/gatepass/v2/student/get_dates",
    {
      headers: { Authorization: accessToken },
    }
  )
    .then((Response) => Response.json())
    .then((response) => {
      currentTime = response.currentTime;
    });

  const startTimeObject = startTime;
  const lastTimeObject = lastTime;
  const curTimeObject = departureTime;

  if (startTimeObject <= curTimeObject && curTimeObject <= lastTimeObject) {
    return true;
  } else {

    return false;
  }
};
export { check_time };

const check_other_gatePass = async function (accessToken, startTime, lastTime, departureTime) {
  const res0 = await check_time(accessToken, startTime, lastTime, departureTime);
  const res1 = await check_black_list(accessToken);
  const res2 = await check_status(accessToken);

  if (res1 === true) {
    console.log("Gate-pass is blocked");
    alert("Sorry, the gate-pass is blocked");
    return false;
  } else if (res0 === false) {
    alert("You cannot apply for the gatepass outside of the permitted hours");
    return false;
  } else if (res2.rowsAffected[0] === 0) {
    return true;
  } else if (
      res2.recordset[0].count > 0 &&
      res2.recordset[0].status === "Approved"
  ) {
    alert("One gate-pass is already approved");
    return false;
  } else if (
      res2.recordset[0].count > 0 &&
      res2.recordset[0].status === "CHECKEDOUT"
  ) {
    alert("You are already checked out");
    return false;
  } else if (
      res2.recordset[0].count > 0 &&
      res2.recordset[0].status === "Pending"
  ) {
    alert("You have one pending gate-pass");
    return false;
  } else {
    console.log("Time is valid");
    console.log("Overall Result: true");
    return true;
  }
};

export { check_other_gatePass };


const apply_local_flexible = async function (
  accessToken,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  purpose
) {

  const warden_details = await get_warden_details(accessToken);
  const allowed_warden = warden_details.alloted_warden;


  let sending_data = fetch(
    "http://127.0.0.1:4000/gatepass/v2/student/apply_local_flexible",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },

      body: JSON.stringify({
        gatepass_type: 2,
        from_date: departureDate,
        from_time: departureTime,
        to_date: arrivalDate,
        to_time: arrivalTime,
        purpose: purpose,
        destination:"Neemrana",
        approval_to: allowed_warden
      }),
    }
  )
    .then((Response) => Response.json())
    .then((response) => response)
    .catch((error) => console.log("error: " + error));

  return sending_data;
};

export { apply_local_flexible };

const handle_submit_local_flexible = async function (
  accessToken,
  startTime,
  endTime,
  departureTime,
  arrivalDate,
  departureDate,
  purpose
) {
  console.log("Handle submit button - clicked");
  const check = await check_other_gatePass(accessToken, startTime, endTime, departureTime);
  if (check === true) {
   alert("You have Successfully applied for local flexible Gate-pass");
    await apply_local_flexible(
      accessToken,
      departureDate,
      departureTime,
      arrivalDate,
      endTime,
      purpose
    );
  }
};

export { handle_submit_local_flexible };





const check_time_og = async function (accessToken, startTime, lastTime, departureTime) {
  let currentTime = "";
  const response = fetch(
      "http://localhost:4000/gatepass/v2/student/get_dates",
      {
        headers: { Authorization: accessToken },
      }
  )
      .then((Response) => Response.json())
      .then((response) => {
        currentTime = response.currentTime;
      });

  const startTimeObject = startTime;
  const lastTimeObject = lastTime;
  const curTimeObject = departureTime;

  if (startTimeObject >= curTimeObject && curTimeObject <= lastTimeObject) {
    return true;
  } else {

    return false;
  }
};
export { check_time_og };

const check_other_og = async function (accessToken, startTime, lastTime, departureTime) {
  // const res0 = await check_time_og(accessToken, startTime, lastTime, departureTime);
  const res1 = await check_black_list(accessToken);
  const res2 = await check_status(accessToken);

  if (res1 === true) {
    console.log("Gate-pass is blocked");
    alert("Sorry, the gate-pass is blocked");
    return false;
  // } else if (res0 === false) {
  //   alert("You cannot apply for the gatepass outside of the permitted hours");
  //   return false;
  } else if (res2.rowsAffected[0] === 0) {
    return true;
  } else if (
      res2.recordset[0].count > 0 &&
      res2.recordset[0].status === "Approved"
  ) {
    alert("One gate-pass is already approved");
    return false;
  } else if (
      res2.recordset[0].count > 0 &&
      res2.recordset[0].status === "CHECKEDOUT"
  ) {
    alert("You are already checked out");
    return false;
  } else if (
      res2.recordset[0].count > 0 &&
      res2.recordset[0].status === "Pending"
  ) {
    alert("You have one pending gate-pass");
    return false;
  } else {
    console.log("Time is valid");
    console.log("Overall Result: true");
    return true;
  }
};

export { check_other_og };

const apply_outstation = async function (
    accessToken,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    purpose,
    destination
) {

  const warden_details = await get_warden_details(accessToken);
  const allowed_warden = warden_details.alloted_warden;


  let sending_data = fetch(
      "http://127.0.0.1:4000/gatepass/v2/student/apply_local_flexible",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },

        body: JSON.stringify({
          gatepass_type: 3,
          from_date: departureDate,
          from_time: departureTime,
          to_date: arrivalDate,
          to_time: arrivalTime,
          purpose: purpose,
          destination:destination,
          approval_to: allowed_warden
        }),
      }
  )
      .then((Response) => Response.json())
      .then((response) => response)
      .catch((error) => console.log("error: " + error));

  return sending_data;
};

export { apply_outstation};

const handle_submit_outstation = async function (
    accessToken,
    startTime,
    endTime,
    departureTime,
    arrivalDate,
    departureDate,
    purpose,
    destination,
) {
  console.log("Handle submit button - clicked");
  const check = await check_other_og(accessToken, startTime, endTime, departureTime);
  if (check === true) {
    alert("You have Successfully applied for Outstation Gate-pass");
    await apply_outstation(
        accessToken,
        departureDate,
        departureTime,
        arrivalDate,
        endTime,
        purpose,
        destination
    );
  }
};

export { handle_submit_outstation };


const apply_emergency = async function (
    accessToken,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    purpose,
    destination
) {

  const warden_details = await get_warden_details(accessToken);
  const allowed_warden = warden_details.alloted_warden;


  let sending_data = fetch(
      "http://127.0.0.1:4000/gatepass/v2/student/apply_local_flexible",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },

        body: JSON.stringify({
          gatepass_type: 6,
          from_date: departureDate,
          from_time: departureTime,
          to_date: arrivalDate,
          to_time: arrivalTime,
          purpose: purpose,
          destination:destination,
          approval_to: allowed_warden
        }),
      }
  )
      .then((Response) => Response.json())
      .then((response) => response)
      .catch((error) => console.log("error: " + error));

  return sending_data;
};

export { apply_emergency};

const handle_Emergency = async function (
    accessToken,
    startTime,
    endTime,
    departureTime,
    arrivalDate,
    departureDate,
    purpose,
    destination,
) {
  console.log("Handle submit button - clicked");
  const check = await check_other_og(accessToken, startTime, endTime, departureTime);
  if (check === true) {
    alert("You have Successfully applied for Emergency Gate-pass");
    await apply_emergency(
        accessToken,
        departureDate,
        departureTime,
        arrivalDate,
        endTime,
        purpose,
        destination
    );
  }
};

export { handle_Emergency };



