import { useEffect, useState } from "react";
import designs from "../StudentStyling/S5_ProfileCSS";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import { week } from "../StudentGatepassHandler/S1_ParameterConfig";
import moment from "moment";
import Cookies from "js-cookie";
import LFfunctions from "../StudentGatepassHandler/S1_LocalFixed";

const S6_Form = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [wselec, setWselect] = useState("");
  const [wOpen, setWopen] = useState(false);

  const [departureDateVisible, setDepartureDateVisible] = useState(false);
  const [departureTimeVisible, setDepartureTimeVisible] = useState(false);
  const [arrivalDateVisible, setArrivalDateVisible] = useState(false);
  const [arrivalTimeVisible, setArrivalTimeVisible] = useState(false);
  const [destinationVisible, setDestinationVisible] = useState(false);
  const [reasonVisible, setReasonVisible] = useState(false);
  const [wardenVisible, setWardenVisible] = useState(false);

  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [weekLimit, setWeekLimit] = useState(0);
  const accessToken = Cookies.get("ACCESS_TOKEN");

  useEffect(() => {
    const fetchData = async () => {
      let config = await week(accessToken);
      setDepartureTime(
        moment(config.departureTime, "HH:mm:ss").format("HH:mm")
      );
      setArrivalTime(moment(config.arrivalTime, "HH:mm:ss").format("HH:mm"));
      setWeekLimit(config.weekLimit);
    };
    fetchData();

    setDepartureDate(new Date().toLocaleDateString("en-GB"));
    setArrivalDate(new Date().toLocaleDateString("en-GB"));
    console.log("date  = ", departureDate);
  });

  const handleClick = async () => {
    try {
      let localFixedUsed = 0;
      const check = await LFfunctions.checkLocalFixed(
        accessToken,
        departureTime,
        arrivalTime,
        localFixedUsed,
        weekLimit
      );

      if (check === true) {
        await LFfunctions.applyLocalFixedGatepass(
          accessToken,
          departureDate,
          departureTime,
          arrivalDate,
          arrivalTime,
          weekLimit
        );
        alert("You have successfully applied for Local Fixed Gatepass!");
      }
    } catch (error) {
      console.error(error);
      // Handle the error here
      alert("An error occurred while applying for Local Fixed Gatepass!");
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDepartureDateVisible(true);
    setDepartureTimeVisible(true);
    setArrivalDateVisible(true);
    setArrivalTimeVisible(true);
    setDestinationVisible(false);
    setReasonVisible(false);
    setWardenVisible(false);

    if (option === "Local Flexible") {
      setReasonVisible(true);
      setWardenVisible(true);
    } else if (option === "Outstation" || option === "Emergency") {
      setDestinationVisible(true);
      setReasonVisible(true);
      setWardenVisible(true);
    }
  };

  const handleWselect = (option) => {
    setWselect(option);
    setWopen(false);
  };

  const handlewDropDown = () => {
    setWopen(!wOpen);
  };

  const Altwardens = ["Warden-1", "Warden-2", "Warden-3"];

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
                <option value="Local Fixed">Local Fixed</option>
                <option value="Local Flexible">Local Flexible</option>
                <option value="Outstation">Outstation</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            {departureDateVisible && (
              <>
                <p className="font-bold mb-2">Departure Date</p>
                <div className={designs.d13}>
                  <DatePicker
                    selected={new Date()} // Provide the selected date value here
                    onChange={(date) => console.log(date)} // Handle the date change
                    className="bg-Items_bg"
                    placeholderText="Date to be fetched from server"
                    disabled={selectedOption === "Local Fixed"} // Disable the picker when Local Fixed is selected
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
                      selectedOption === "LocalFixed"
                        ? "1:00"
                        : `${departureTime}`
                    } // change the condition here for departure time
                    className="disabled:bg-Items_bg bg-Items_bg border-2 border-gray-300 rounded-md p-2"
                    onChange={(time) => console.log(time)} // Handle the time change
                    placeholder="Time to be fetched from server"
                    disabled={selectedOption === "Local Fixed"} // Disable the picker when Local Fixed is selected
                  />
                </div>
              </>
            )}

            {arrivalDateVisible && (
              <>
                <p className="font-bold mb-2">Arrival Date</p>
                <div className={designs.d13}>
                  <DatePicker
                    className="bg-Items_bg "
                    selected={new Date()} // Provide the selected date value here
                    onChange={(date) => console.log(date)} // Handle the date change
                    placeholderText="Date to be fetched from server"
                    disabled={selectedOption === "Local Fixed"} // Disable the picker when Local Fixed is selected
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
                      selectedOption === "LocalFixed" ? "1:00" : arrivalTime
                    }
                    className="disabled:bg-Items_bg bg-Items_bg border-2 border-gray-300 rounded-md p-2"
                    onChange={(time) => console.log(time)} // Handle the time change
                    placeholder="Time to be fetched from server"
                    disabled={selectedOption === "Local Fixed"} // Disable the picker when Local Fixed is selected
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

export default S6_Form;
