const check_valid_day = async (accessToken) => {
    try {
        const response = await fetch('http://127.0.0.1:4000/gatepass/v2/admin/parameter_config', {
            headers: {
                Authorization: accessToken
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data from the API");
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
