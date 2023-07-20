import {check_black_list} from "./S0_CommonChecks";
import {check_status} from "./S0_CommonChecks";
import {get_warden_details} from "./S0_CommonChecks";


const check_Emergency = async function (accessToken) {

    const res1 = await check_black_list(accessToken);
    const res2 = await check_status(accessToken);

    if (res1 === true) {
        console.log("Gate-pass is blocked");
        alert("Sorry, the gate-pass is blocked");
        return false;

    } else if (res2.rowsAffected[0] === 0) {
        return true;
    }  else if (
        res2.recordset[0].count > 0 &&
        res2.recordset[0].status === "CHECKEDOUT"
    ) {
        alert("You are already checked out");
        return false;
    }  else {
        console.log("Time is valid");
        console.log("Overall Result: true");
        return true;
    }
};

export { check_Emergency };


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
    const check = await check_Emergency(accessToken, startTime, endTime, departureTime);
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

export {handle_Emergency};
