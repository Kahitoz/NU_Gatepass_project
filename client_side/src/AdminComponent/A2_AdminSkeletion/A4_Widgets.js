import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const A4_Widgets = () => {
    const [Oncampus, setOncampus] = useState(0);
    const [Outcampus, setOutcampus] = useState(0);
    const [PendingRequests, setPendingRequests] = useState(0);
    const [Defaulter, setDefaulter] = useState(0);
    const accessToken = Cookies.get("ACCESS_TOKEN");

    useEffect(() => {
        // Fetch Pending Requests
        fetch("http://127.0.0.1:4000/gatepass/v2/admin/pending_request", {
            headers: {
                Authorization: accessToken,
            },
        })
            .then((response) => response.text())
            .then((data) => setPendingRequests(parseInt(data)))
            .catch((error) => console.error("Error fetching pending requests:", error));

        // Fetch Students In Campus
        fetch("http://127.0.0.1:4000/gatepass/v2/admin/student_in_campus", {
            headers: {
                Authorization: accessToken,
            },
        })
            .then((response) => response.text())
            .then((data) => setOncampus(parseInt(data)))
            .catch((error) => console.error("Error fetching in-campus students:", error));

        // Fetch Students Out of Campus
        fetch("http://127.0.0.1:4000/gatepass/v2/admin/student_out_campus", {
            headers: {
                Authorization: accessToken,
            },
        })
            .then((response) => response.text())
            .then((data) => setOutcampus(parseInt(data)))
            .catch((error) => console.error("Error fetching out-campus students:", error));

        // Fetch Blacklisted Students
        fetch("http://127.0.0.1:4000/gatepass/v2/admin/blacklist_student", {
            headers: {
                Authorization: accessToken,
            },
        })
            .then((response) => response.text())
            .then((data) => setDefaulter(parseInt(data)))
            .catch((error) => console.error("Error fetching blacklisted students:", error));
    }, [accessToken]);

    return (
        <div className={`grid grid-cols-2 gap-2 m-2`}>
            <div className={`flex bg-white shadow-md rounded-2xl p-2 justify-center font-bold`}>
                <p className={`mx-2`}>Pending Request:</p>
                <p className={`text-red-500`}>{PendingRequests}</p>
            </div>

            <div className={`flex bg-white shadow-md rounded-2xl p-2 justify-center font-bold`}>
                <p className={`mx-2`}>In Campus:</p>
                <p className={`text-blue-500`}>{Oncampus}</p>
            </div>

            <div className={`flex bg-white shadow-md rounded-2xl p-2 justify-center font-bold`}>
                <p className={`mx-2`}>Out Campus:</p>
                <p className={`text-yellow-500`}>{Outcampus}</p>
            </div>

            <div className={`flex bg-white shadow-md rounded-2xl p-2 justify-center font-bold`}>
                <p className={`mx-2`}>Blocked:</p>
                <p>{Defaulter}</p>
            </div>
        </div>
    );
};

export default A4_Widgets;
