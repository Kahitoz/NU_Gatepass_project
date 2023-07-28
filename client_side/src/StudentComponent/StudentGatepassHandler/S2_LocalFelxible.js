import {check_time_localFlexible, get_warden_details} from "./S0_CommonChecks";
import {check_black_list} from "./S0_CommonChecks";
import {check_status} from "./S0_CommonChecks";


const check_other_gatePass = async function (accessToken, startTime, lastTime, departureTime) {
  const res0 = await check_time_localFlexible(accessToken, startTime, lastTime, departureTime);
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
  purpose,
  setModalTitle,
  setModalMessage,
  setShowModal
) {

  const check = await check_other_gatePass(accessToken, startTime, endTime, departureTime);
  if (check === true) {
    setModalTitle("Success");
    setModalMessage("You have Successfully applied for Local Flexible Gate-pass");
    setShowModal(true);
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











