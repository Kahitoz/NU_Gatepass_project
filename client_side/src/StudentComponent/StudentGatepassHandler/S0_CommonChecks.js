import moment from "moment";

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

const check_time_localFlexible = async function (accessToken, startTime, lastTime, departureTime) {
    const response = await fetch("http://localhost:4000/gatepass/v2/student/get_dates", {
        headers: { Authorization: accessToken },
    });

    const allowed_time = allowedTime();

    const startTimeObject = moment(startTime, 'HH:mm');
    const lastTimeObject = moment(lastTime, 'HH:mm');
    const curTimeObject = moment(departureTime, 'HH:mm');

    if (curTimeObject.isBefore(moment(allowed_time, 'HH:mm'))) {
        return false;
    }
    if (moment(allowed_time, 'HH:mm').isAfter(lastTimeObject.clone().subtract(1, 'hour'))) {
        return false;
    }
    if (curTimeObject.isAfter(lastTimeObject.clone().subtract(1, 'hour'))) {
        return false;
    }
    if (curTimeObject.isSameOrAfter(startTimeObject) && curTimeObject.isSameOrBefore(lastTimeObject)) {
        return true;
    }
    return false;
};

export { check_time_localFlexible };


const allowedTime = () => {
    return moment().add(2, 'hours').format('HH:mm');
};


