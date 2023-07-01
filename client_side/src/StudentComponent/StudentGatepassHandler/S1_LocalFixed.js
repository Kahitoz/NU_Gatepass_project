//check black list starts here

var checkBlacklist = async function (accessToken) {
  const response = await fetch(
    "http://127.0.0.1:4000/gatepass/v2/student/blacklisted/",
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  const jsonResponse = await response.json();
  return jsonResponse.blacklisted;
};

export { checkBlacklist };

// check black list ends here

//Total Local Fixed starts here

var fetchDate = async function (accessToken) {
  let currentDate = null;
  let lastMonday = null;
  let nextMonday = null;
  const response = await fetch("http://127.0.0.1:4000/gatepass/v2/student/get_dates", {
    headers: { Authorization: accessToken },
  });
  

};

//Total local Fixed ends here


//Apply Gatepass Starts here
var ApplyLFGatepass = async function(accessToken ,departureDate ,departureTime ,arrivalDate ,arrivalTime){
  let fetchData = fetch(
    "http://127.0.0.1:4000/gatepass/v2/student/apply_local_fixed",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        punch_id: null,
        from_date: departureDate,
        from_time: departureTime,
        to_date: arrivalDate,
        to_time: arrivalTime,
      }),
    }
  )
    .then((Response) => Response.json())
    .then((response) => response)
    .catch((error) => console.log("error: " + error));

    alert("You have applied for the local fixed gatepass");

  return fetchData;
}

export {ApplyLFGatepass}
//Apply Gatepass Ends Herew