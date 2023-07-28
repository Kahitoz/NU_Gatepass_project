import {check_black_list} from "./S0_CommonChecks";
import {check_status} from "./S0_CommonChecks";
import {get_warden_details} from "./S0_CommonChecks";
import moment from "moment/moment";


const check_time_Outstation = (lastTime, departureTime, departureDate, arrivalDate) => {
    const lastTimeMoment = moment(lastTime, 'HH:mm');
    const departureTimeMoment = moment(departureTime, 'HH:mm');
    const departureDateMoment = moment(departureDate, 'YYYY-MM-DD');
    const arrivalDateMoment = moment(arrivalDate, 'YYYY-MM-DD');

    const allowed_time = allowedTime();



    if (departureDateMoment.isSame(moment(), 'day') && departureTimeMoment.isSameOrBefore(lastTimeMoment)) {
        return false;
    }
    if (departureDateMoment.isSameOrBefore(moment(), 'day')) {
        return false;
    }
    if (arrivalDateMoment.isSameOrBefore(departureDateMoment, 'day')) {
        return false;
    }
    if (departureTimeMoment.isAfter(moment(allowed_time, 'HH:mm'))) {
        return true;
    }
 /*   if (lastTimeMoment.isSameOrBefore(departureTimeMoment)) {
        return false;
    }
*/
    return true;
};
export {check_time_Outstation}
const allowedTime = () => {
    return moment().add(2, 'hours').format('HH:mm');
};


const check_Outstation = async function (accessToken, lastTime, departureTime, departureDate, arrivalDate) {
    const res1 = await check_black_list(accessToken);
    const res2 = await check_status(accessToken);
    const res3 = check_time_Outstation(lastTime, departureTime, departureDate, arrivalDate)

    if (res3 === false) {
        return { success: false, message: "Sorry, The time selected is incorrect" };
    } else if (res2.rowsAffected[0] === 0) {
        return { success: true };
    } else if (
        res2.recordset[0].count > 0 &&
        res2.recordset[0].status === "CHECKEDOUT"
    ) {
        return { success: false, message: "You are already checked out" };
    } else if (
        res2.recordset[0].count > 0 &&
        res2.recordset[0].status === "Pending"
    ) {
        return { success: false, message: "You have one pending gate-pass" };
    } else if (res1===true){
        return {success:false, message:"Sorry Gatepass is blocked"}
    }else {
        return { success: true };
    }
};

export { check_Outstation };


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

const handle_Outstation = async function (
    accessToken,
    startTime,
    endTime,
    departureTime,
    arrivalDate,
    departureDate,
    purpose,
    destination,
    setModalTitle,
    setModalMessage,
    setShowModal
) {
    console.log("Handle submit button - clicked");
    const checkResult = await check_Outstation(accessToken, endTime, departureTime, departureDate, arrivalDate);

    if (checkResult.success===true) {
        setModalTitle("Success");
        setModalMessage("You have Successfully applied for Outstation Gate-pass");
        setShowModal(true);
        await apply_outstation(
            accessToken,
            departureDate,
            departureTime,
            arrivalDate,
            endTime,
            purpose,
            destination
        );
    } else if(checkResult.success === false) {
        setModalTitle("Failure");
        setModalMessage(checkResult.message);
        setShowModal(true);
    }
};

export { handle_Outstation };

