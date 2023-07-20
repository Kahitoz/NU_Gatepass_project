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
export { check_time_localFlexible };