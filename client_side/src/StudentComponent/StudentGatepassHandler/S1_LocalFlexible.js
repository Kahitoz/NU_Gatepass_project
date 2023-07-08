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

const check_time = async function (accessToken, departureTime) {
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
  const startTime = "06:00:00";
  const lastTime = departureTime ;

  const startTimeObject = new Date(`1970-01-01T${startTime}Z`);
  const lastTimeObject = new Date(`1970-01-01T${lastTime}Z`);
  const curTimeObject = new Date(`1970-01-01T${currentTime}Z`);

  if (startTimeObject <= curTimeObject && curTimeObject <= lastTimeObject) {
    return true;
  } else {
    return false;
  }
};
export { check_time };

const check_local_flexible = async function (accessToken, departureTime) {
  const res0 = await check_time(accessToken, departureTime);
  const res1 = await check_black_list(accessToken);
  const res2 = await check_status(accessToken);

  if (res1 === true) {
    alert("Sorry gatepass is blocked");
    return false;
  } else if (res0 === false) {
    alert("You cannot apply the gatepass in the outside hours");
    return false;
  } else if (res2.rowsAffected[0] === 0) {
    return true;
  } else if (
    res2.recordset[0].count > 0 &&
    res2.recordset[0].status === "Approved"
  ) {
    alert("One Gatepass is already approved");
    return false;
  } else if (
    res2.recordset[0].count > 0 &&
    res2.recordset[0].status === "CHECKEDOUT"
  ) {
    alert("You are already Checkedout");
    return false;
  } else if (
    res2.recordset[0].count > 0 &&
    res2.recordset[0].status === "PENDING"
  ) {
    alert("You have one pending gatepass");
    return false;
  } else {
    return true;
  }
};
export { check_local_flexible };

const apply_local_flexible = async function (
  accessToken,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  purpose
) {
  let sending_data = fetch(
    "http://127.0.0.1:4000/gatepass/v2/student/apply_local_flexible",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        from_date: departureDate,
        from_time: departureTime,
        to_date: arrivalDate,
        to_time: arrivalTime,
        purpose: purpose,
        approval_to: get_warden_details(accessToken).alloted_warden,
      }),
    }
  )
    .then((Response) => Response.json())
    .then((response) => response)
    .catch((error) => console.log("error: " + error));

  return sending_data;
};

export { apply_local_flexible };

const handle_submit = async function (
  accessToken,
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
  purpose
) {
  console.log("Handle submit button - clicked");
  const check = check_local_flexible(accessToken, departureTime);
  if (check === true) {
    await apply_local_flexible(
      accessToken,
      departureDate,
      departureTime,
      arrivalDate,
      arrivalTime,
      purpose
    );
  }
};

export { handle_submit };
