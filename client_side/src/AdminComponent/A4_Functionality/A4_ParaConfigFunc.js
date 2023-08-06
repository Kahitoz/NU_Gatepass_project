import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import designs from "../A3_AdminStyling/A2_GatepassTableStyling";

export const A4_ParaConfigFunc = () => {
    const [parameter, setParameter] = useState([]);

    const [limit, setLimit] = useState(0);
    const [inTime, setInTime] = useState("00:00:00");
    const [outTime, setOutTime] = useState("00:00:00");
    const [arrivalUB, setArrivalUB] = useState("00:00:00");
    const [arrivalLB, setArrivalLB] = useState("00:00:00");
    const [flex, setFlex] = useState(0);

    const [newLimit, setNewLimit] = useState(0);
    const [newInTime, setNewInTime] = useState("00:00:00");
    const [newOutTime, setNewOutTime] = useState("00:00:00");
    const [newArrivalUB, setNewArrivalUB] = useState("00:00:00");
    const [newArrivalLB, setNewArrivalLB] = useState("00:00:00");
    const [newFlex, setNewFlex] = useState(0);
    const accessToken = Cookies.get("ACCESS_TOKEN");

    useEffect(() => {
        // Function to fetch the data
        const fetchData = () => {
            fetch("http://127.0.0.1:4000/gatepass/v2/admin/parameter_config", {
                headers: {
                    Authorization: accessToken,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setParameter(data);
                });
        };

        // Fetch data initially
        fetchData();

        // Set interval to fetch data every second
        const intervalId = setInterval(() => {
            fetchData();
        }, 100000);

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [accessToken]); // Don't forget to add the dependencies in the array if you have any

    useEffect(() => {
        // Update state variables when the 'parameter' state changes
        if (parameter.length !== 0) {
            setLimit(parameter[0]["value"]);
            setOutTime(parameter[1]["value"]);
            setInTime(parameter[2]["value"]);
            setArrivalUB(parameter[3]["value"]);
            setArrivalLB(parameter[4]["value"]);
            setFlex(parameter[5]["value"]);
        }
    }, [parameter]);

    const refresh = () => window.location.reload(true);
    const handleClick = (event) => {
        switch (event.target.name) {
            case "limit": {
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: accessToken,
                    },
                    body: JSON.stringify({value: newLimit}),
                };
                if (window.confirm("Do you want to save changes?") === true) {
                    fetch(
                        "http://127.0.0.1:4000/gatepass/v2/admin/parameter_config/week_limit/1",
                        requestOptions
                    );
                    refresh();
                    break;
                } else {
                    break;
                }
            }
            case "outTime": {
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: accessToken,
                    },
                    body: JSON.stringify({value: newOutTime}),
                };
                if (window.confirm("Do you want to save changes?") === true) {
                    fetch(
                        "http://127.0.0.1:4000/gatepass/v2/admin/parameter_config/out_time/2",
                        requestOptions
                    );
                    refresh();
                    break;
                } else {
                    break;
                }
            }
            case "inTime": {
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: accessToken,
                    },
                    body: JSON.stringify({value: newInTime}),
                };
                if (window.confirm("Do you want to save changes?") === true) {
                    fetch(
                        "http://127.0.0.1:4000/gatepass/v2/admin/parameter_config/in_time/3",
                        requestOptions
                    );
                    refresh();
                    break;
                } else {
                    break;
                }
            }
            case "arrivalUB": {
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: accessToken,
                    },
                    body: JSON.stringify({value: newArrivalUB}),
                };
                if (window.confirm("Do you want to save changes?") === true) {
                    fetch(
                        "http://127.0.0.1:4000/gatepass/v2/admin/parameter_config/arrival_restrict_ub/4",
                        requestOptions
                    );
                    refresh();
                    break;
                } else {
                    break;
                }
            }
            case "arrivalLB": {
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: accessToken,
                    },
                    body: JSON.stringify({value: newArrivalLB}),
                };
                if (window.confirm("Do you want to save changes?") === true) {
                    fetch(
                        "http://127.0.0.1:4000/gatepass/v2/admin/parameter_config/arrival_restrict_lb/5",
                        requestOptions
                    );
                    refresh();
                    break;
                } else {
                    break;
                }
            }
            case "flex": {
                const requestOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: accessToken,
                    },
                    body: JSON.stringify({value: newFlex}),
                };
                if (window.confirm("Do you want to save changes?") === true) {
                    fetch(
                        "http://127.0.0.1:4000/gatepass/v2/admin/parameter_config/flexible_entry/6",
                        requestOptions
                    );
                    refresh();
                    break;
                } else {
                    break;
                }
            }
        }
    };
    return(
        <div>

            <div>
                <div className={`${designs.d1}`}>
                    <div className={`${designs.d2}`}>
                        <h1 className={`${designs.d5}`}>S.No.</h1>
                        <h1 className={`${designs.d5}`}>Parameters</h1>
                        <h1 className={`${designs.d5}`}>Current Value</h1>
                        <h1 className={`${designs.d5}`}>Change To</h1>
                        <h1 className={`${designs.d5}`}></h1>
                    </div>

                </div>
            </div>
            <div className={`${designs.d3}`}>
                <div className={`${designs.d4}`}>
                    <h1 className={`${designs.d5}`}>1</h1>
                    <h1 className={`${designs.d5}`}>Week Limit</h1>
                    <h1 className={`${designs.d5}`}>{limit}</h1>
                    <h1 className={`${designs.d5}`}>
                        <input
                            className="rounded-md p-1 w-10/12"
                            type="number"
                            placeholder=""
                            onChange={(event) => {
                                setNewLimit(event.target.value);
                            }}
                        ></input>
                    </h1>
                    <h1 className={`${designs.d5}`}>
                        <button
                            type="button"
                            name="limit"
                            className="bg-Navbar_bg p-2 text-white hover:border-2"
                            onClick={handleClick}
                        >
                            Change
                        </button>
                    </h1>
                </div>
                <div className={`${designs.d4}`}>
                    <h1 className={`${designs.d5}`}>2</h1>
                    <h1 className={`${designs.d5}`}>Out Time</h1>
                    <h1 className={`${designs.d5}`}>{outTime}</h1>
                    <h1 className={`${designs.d5}`}>
                        <input
                            className="rounded-md p-1 w-10/12"
                            type="text"
                            placeholder=""
                            onChange={(event) => {
                                setNewOutTime(event.target.value);
                            }}
                        ></input>
                    </h1>
                    <h1 className={`${designs.d5}`}>
                        <button
                            type="button"
                            name="outTime"
                            className="bg-Navbar_bg p-2 text-white hover:border-2"
                            onClick={handleClick}
                        >
                            Change
                        </button>
                    </h1>
                </div>

                <div className={`${designs.d4}`}>
                    <h1 className={`${designs.d5}`}>3</h1>
                    <h1 className={`${designs.d5}`}>In Time</h1>
                    <h1 className={`${designs.d5}`}>{inTime}</h1>
                    <h1 className={`${designs.d5}`}>
                        <input
                            className="rounded-md p-1 w-10/12"
                            type="text"
                            placeholder=""
                            onChange={(event) => {
                                setNewInTime(event.target.value);
                            }}
                        ></input>
                    </h1>
                    <h1 className={`${designs.d5}`}>
                        <button
                            type="button"
                            name="inTime"
                            className="bg-Navbar_bg p-2 text-white hover:border-2"
                            onClick={handleClick}
                        >
                            Change
                        </button>
                    </h1>
                </div>

                <div className={`${designs.d4}`}>
                    <h1 className={`${designs.d5}`}>4</h1>
                    <h1 className={`${designs.d5}`}>
                        Arrival Restrict UB
                    </h1>
                    <h1 className={`${designs.d5}`}>{arrivalUB}</h1>
                    <h1 className={`${designs.d5}`}>
                        <input
                            className="rounded-md p-1 w-10/12"
                            type="text"
                            placeholder=""
                            onChange={(event) => {
                                setNewArrivalUB(event.target.value);
                            }}
                        ></input>
                    </h1>
                    <h1 className={`${designs.d5}`}>
                        <button
                            type="button"
                            name="arrivalUB"
                            className="bg-Navbar_bg p-2 text-white hover:border-2"
                            onClick={handleClick}
                        >
                            Change
                        </button>
                    </h1>
                </div>

                <div className={`${designs.d4}`}>
                    <h1 className={`${designs.d5}`}>5</h1>
                    <h1 className={`${designs.d5}`}>
                        Arrival Restrict LB
                    </h1>
                    <h1 className={`${designs.d5}`}>{arrivalLB}</h1>
                    <h1 className={`${designs.d5}`}>
                        <input
                            className="rounded-md p-1 w-10/12"
                            type="text"
                            placeholder=""
                            onChange={(event) => {
                                setNewArrivalLB(event.target.value);
                            }}
                        ></input>
                    </h1>
                    <h1 className={`${designs.d5}`}>
                        <button
                            type="button"
                            name="arrivalLB"
                            className="bg-Navbar_bg p-2 text-white hover:border-2"
                            onClick={handleClick}
                        >
                            Change
                        </button>
                    </h1>
                </div>

                <div className={`${designs.d4}`}>
                    <h1 className={`${designs.d5}`}>6</h1>
                    <h1 className={`${designs.d5}`}>
                        Flexible Entry(In Minutes)
                    </h1>
                    <h1 className={`${designs.d5}`}>{flex}</h1>
                    <h1 className={`${designs.d5}`}>
                        <input
                            className="rounded-md p-1 w-10/12"
                            type="number"
                            placeholder=""
                            onChange={(event) => {
                                setNewFlex(event.target.value);
                            }}
                        ></input>
                    </h1>
                    <h1 className={`${designs.d5}`}>
                        <button
                            type="button"
                            name="flex"
                            className="bg-Navbar_bg p-2 text-white hover:border-2"
                            onClick={handleClick}
                        >
                            Change
                        </button>
                    </h1>
                </div>
            </div>
        </div>
    )
}
export default A4_ParaConfigFunc;