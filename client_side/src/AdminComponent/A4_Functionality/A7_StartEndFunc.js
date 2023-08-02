import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import A6_StartEndHandler from "../A2_AdminSkeletion/A6_StartEndHandler";

const A7_StartEndFunc = () => {
    const [startDay, setStartDay] = useState("");
    const [endDay, setEndDay] = useState("");

    const accessToken = Cookies.get("ACCESS_TOKEN");

    useEffect(() => {
        // Make a GET request to retrieve parameter configuration
        fetch("http://127.0.0.1:4000/gatepass/v2/admin/parameter_config", {
            method: "GET",
            headers: {
                Authorization: accessToken
            }
        })
            .then(response => response.json())
            .then(data => {
                // Find and set start and end days
                const startDayParam = data.find(item => item.parameter === "Start Day");
                const endDayParam = data.find(item => item.parameter === "End Day");
                if (startDayParam) {
                    setStartDay(startDayParam.value);
                }
                if (endDayParam) {
                    setEndDay(endDayParam.value);
                }
            })
            .catch(error => {
                console.error("Error fetching parameter configuration:", error);
            });
    }, [accessToken]);

    const updateStartEndDays = (id, dayType, selectedDay, accessToken) => {
        const apiUrl = `http://127.0.0.1:4000/gatepass/v2/admin/parameter_config/${dayType}/${id}`;

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ value: selectedDay }) // Send the new value in the request body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`PUT request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(`Successfully updated ${dayType}:`, data);
                // You can add further actions here if needed
            })
            .catch(error => {
                console.error(`Error updating ${dayType}:`, error);
            });
    };




    const handleStartDayChange = (selectedDay) => {
        updateStartEndDays(7, "start_day", selectedDay, accessToken);
        setStartDay(selectedDay);
    };

    const handleEndDayChange = (selectedDay) => {
        updateStartEndDays(8, "end_day", selectedDay, accessToken);
        setEndDay(selectedDay);
    };



    return (
        <>
            <div>
                <A6_StartEndHandler
                    startDay={startDay}
                    endDay={endDay}
                    onStartDayChange={handleStartDayChange}
                    onEndDayChange={handleEndDayChange}
                />
            </div>
        </>
    );
}

export default A7_StartEndFunc;
