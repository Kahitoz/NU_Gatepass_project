const week = async (accessToken) => {
  let weekLimit = 0;
  let departureTime = null;
  let arrivalTime = null;

  const response = await fetch("http://127.0.0.1:4000/gatepass/v2/admin/parameter_config", {
    headers: {
      Authorization: accessToken,
    },
  });

  const text = await response.json();
  weekLimit = text[0]["value"];
  departureTime = text[1]["value"];
  arrivalTime = text[2]["value"];

  const json_obj = {weekLimit: weekLimit, departureTime: departureTime, arrivalTime: arrivalTime};
  return json_obj;
};

export { week };
