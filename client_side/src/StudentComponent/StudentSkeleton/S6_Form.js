import designs from "../StudentStyling/S5_ProfileCSS";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect } from "react";
import moment from "moment";

const S6_FormDesigns = ({
  selectedOption,
  departureDateVisible,
  departureTimeVisible,
  arrivalDateVisible,
  arrivalTimeVisible,
  destinationVisible,
  reasonVisible,
  wardenVisible,
  departureTime,
  arrivalTime,
  handleOptionSelect,
  handleWselect,
  handlewDropDown,
  wselec,
  wOpen,
  Altwardens,
  handleClick,
  reason,
  lf_departureTime,
  d_Time,
  setReason,
  og_arrivalDate,
  og_departureDate, destination, set_destination,set_og_arrivalTime,og_arrivalTime,checkTodayGatepass

}) => {
  const [depTime,setDepTime] = React.useState(departureTime);
  const [arriveTime,setArriveTime] = React.useState(arrivalTime);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedArrival, setSelectedArrival] = React.useState(new Date())
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Departure Date is ", date);
    const formattedDepartureDate = moment(date).format("YYYY-MM-DD");
    og_departureDate(formattedDepartureDate);
  };

  let dateValue = selectedDate;
  if (["Local Fixed", "Local Flexible"].includes(selectedOption)) {
    dateValue = new Date();
  }

  const handleArrivalDateChange = (date) =>{
    setSelectedArrival(date)
    console.log("Arrival Date")
    const formattedArrivalDate = moment(date).format("YYYY-MM-DD");
    og_arrivalDate(formattedArrivalDate);
  }

  let arrivalDateValue = selectedArrival;
  if (["Local Fixed", "Local Flexible"].includes(selectedOption)) {
    arrivalDateValue = new Date();
  }




  useEffect(() => {
    if (selectedOption === "Local Fixed") {
      setDepTime(departureTime);
      setArriveTime(arrivalTime);
    }
    else if (selectedOption === "Local Flexible") {
      setArriveTime(arrivalTime);
    }
  }, [selectedOption,depTime,arrivalTime]);
  return (
    <div className="bg-background">
      <div className="p-2 flex justify-center">
        <div className={designs.d11}>
          <div className={designs.d12}>
            <div className=" p-2">
              <select
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
                  value={selectedOption}
                  onChange={(e) => handleOptionSelect(e.target.value)}
              >
                <option value="">Select an Option</option>
                {!checkTodayGatepass && (
                    // Show "Local Fixed" and "Local Flexible" options only if checkTodayGatepass is false
                    <>
                      <option value="Local Fixed">Local Fixed</option>
                      <option value="Local Flexible">Local Flexible</option>
                    </>
                )}
                <option value="Outstation">Outstation</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            {departureDateVisible && (
                <>
                  <p className="font-bold mb-2">Departure Date</p>
                  <div className={designs.d13}>
                    <DatePicker
                        selected={dateValue}
                        value={dateValue}
                        onChange={handleDateChange}
                        className="bg-Items_bg"
                        placeholderText="Date to be fetched from server"
                        disabled={selectedOption === "Local Fixed"}
                    />
                  </div>
                </>

            )}

            {departureTimeVisible && (
              <>
                <p className="font-bold mb-2">Departure Time</p>
                <div className={designs.d13}>
                  <input
                      type="time"
                      value={
                        selectedOption === "Local Fixed"
                            ? departureTime
                            : (selectedOption === "Local Flexible" || selectedOption === "Outstation" || selectedOption === "Emergency")
                                ? d_Time
                                : departureTime
                      }
                      className="disabled:bg-Items_bg bg-Items_bg border-2 border-gray-300 rounded-md p-2"
                      onChange={(e) => (lf_departureTime(e.target.value))}
                      placeholder="Time to be fetched from server"
                      disabled={selectedOption === "Local Fixed"}
                  />

                </div>
              </>
            )}

            {arrivalDateVisible && (
                <>
                  <p className="font-bold mb-2">Arrival Date</p>
                  <div className={designs.d13}>
                    <DatePicker
                        selected={arrivalDateValue}
                        value={arrivalDateValue}
                        onChange={handleArrivalDateChange}
                        className="bg-Items_bg"
                        placeholderText="Date to be fetched from server"
                        disabled={selectedOption === "Local Fixed"}
                    />
                  </div>
                </>
            )}

            {arrivalTimeVisible && (
              <>
                <p className="font-bold mb-2">Arrival Time</p>
                <div className={designs.d13}>
                  <input
                      type="time"
                      value={
                        selectedOption === "Local Fixed" || selectedOption === "Local Flexible"
                            ? arriveTime
                            : (selectedOption === "Local Flexible" || selectedOption === "Outstation" || selectedOption === "Emergency")
                                ? og_arrivalTime
                                : arriveTime
                      }
                      className="disabled:bg-Items_bg bg-Items_bg border-2 border-gray-300 rounded-md p-2"
                      onChange={(e) => (set_og_arrivalTime(e.target.value))}
                      placeholder="Time to be fetched from server"
                      disabled={selectedOption === "Local Fixed"}
                  />
                </div>
              </>
            )}

            {destinationVisible && (
              <>
                <p className="font-bold mb-2">Destination</p>
                <input
                  type="text"
                  className={designs.d13}
                  placeholder="Enter Destination"
                  value={destination}
                  onChange={(e)=>set_destination(e.target.value)}
                />
              </>
            )}

            {reasonVisible && (
              <>
                <p className="font-bold mb-2">Reason</p>
                <input
                  type="text"
                  className={designs.d13}
                  placeholder="Write your reason here"
                  value={reason}
                  onChange={(e)=>setReason(e.target.value)}
                  //reason not getting stored in setReason
                />
              </>
            )}

            {wardenVisible && (
              <>
                <p className="font-bold mb-2">Send Approval To</p>
                <div className="relative p-2">
                  <button
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
                    onClick={handlewDropDown}
                  >
                    {wselec ? wselec : "Select an Option"}
                  </button>
                  {wOpen && (
                    <div className="absolute left-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg z-10">
                      {Altwardens.map((warden) => (
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          onClick={() => handleWselect(warden)}
                          key={warden}
                        >
                          {warden}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
            <button
              className="bg-text-2 p-3 rounded-lg mt-5 text-white"
              onClick={(event) => handleClick(event)}
            >
              Apply Gatepass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default S6_FormDesigns;
