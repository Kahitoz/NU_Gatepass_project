
const api =" http://127.0.0.1:4000/gatepass/v2/admin/parameter_config"
const check_valid_day = async (accessToken) => {
    try {
        const response = await fetch(api, {
            headers: {
                Authorization: accessToken
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch days from the API");
        }

        const parameterConfig = await response.json();

        const today = new Date();
        const startDay = parameterConfig.find(param => param.parameter === 'Start Day')?.value;
        const endDay = parameterConfig.find(param => param.parameter === 'End Day')?.value;

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayDay = daysOfWeek[today.getDay()];

        if (todayDay === startDay || todayDay === endDay) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error checking valid day:", error);
        return false;
    }
};

export {check_valid_day}

const departure_time = async (accessToken) =>{
    const response = await fetch(api, {
        headers:{
             Authorization:accessToken
        }
    });
    if(!response.ok){
        throw new Error("Failed to fetch the departure time from the api")
    }
    const parameterData = await response.json();
    const departureTime = parameterData.find(param => param.parameter === 'Start Time')?.value;

    if(departureTime!=null){
        return departureTime;
    }else{
        return null;
    }
}
export {departure_time}

const arrival_time = async (accessToken)=>{
    const response = await  fetch(api, {
        headers:{
            Authorization:accessToken
        }
    });
    if(!response.ok){
        throw new Error("Failed to fetch the arrival time from the api")
    }
    const parameterData = await response.json();
    const arrivalTime = parameterData.find(param => param.parameter === 'End Time')?.value;
    if(arrivalTime!=null){
        return arrivalTime
    }else{
        return null;
    }
}
export {arrival_time}