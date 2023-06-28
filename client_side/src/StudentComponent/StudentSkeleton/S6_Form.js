import { useState } from "react";
import designs from "../StudentStyling/S5_ProfileCSS";

const S6_Form = () => {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option
  const [isOpen, setIsOpen] = useState(false);
  const [wselec, setWselect] = useState("");
  const [wOpen, setWopen] = useState(false);

  const [departureDateVisible, setDepartureDateVisible] = useState(false);
  const [departureTimeVisible, setDepartureTimeVisible] = useState(false);
  const [arrivalDateVisible, setArrivalDateVisible] = useState(false);
  const [arrivalTimeVisible, setArrivalTimeVisible] = useState(false);
  const [destinationVisible, setDestinationVisible] = useState(false);
  const [reasonVisible, setReasonVisible] = useState(false);
  const [wardenVisible, setWardenVisible] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
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

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleWselect = (option) => {
    setWselect(option);
    setWopen(false);
  };

  const handlewDropDown = () => {
    setWopen(!wOpen);
  };

  return (
    <div className="bg-background">
      <div className="p-2 flex justify-center">
        <div className={designs.d11}>
          <div className={designs.d12}>
            <div className=" p-2">
              <button
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
                onClick={handleDropdownToggle}
              >
                {selectedOption ? selectedOption : "Select an Option"}
              </button>
              {isOpen && (
                <div className="absolute left-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleOptionSelect("Local Fixed")}
                  >
                    Local Fixed
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleOptionSelect("Local Flexible")}
                  >
                    Local Flexible
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleOptionSelect("Outstation")}
                  >
                    Outstation
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => handleOptionSelect("Emergency")}
                  >
                    Emergency
                  </button>
                </div>
              )}
            </div>
            {departureDateVisible && (
              <>
                <p className="font-bold mb-2">Departure Date</p>
                <input
                  type="text"
                  className={designs.d13}
                  placeholder="Date to be fetched from server"
                />
              </>
            )}

            {departureTimeVisible && (
              <>
                <p className="font-bold mb-2">Departure Time</p>
                <input
                  type="text"
                  className={designs.d13}
                  placeholder="Time to be fetched from the server"
                />
              </>
            )}

            {arrivalDateVisible && (
              <>
                <p className="font-bold mb-2">Arrival Date</p>
                <input
                  type="text"
                  className={designs.d13}
                  placeholder="Date to be fetched from server"
                />
              </>
            )}

            {arrivalTimeVisible && (
              <>
                <p className="font-bold mb-2">Arrival Time</p>
                <input
                  type="text"
                  className={designs.d13}
                  placeholder="Time to be fetched from server"
                />
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
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => handleWselect("Warden 1")}
                      >
                        Warden 1
                      </button>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => handleWselect("Warden 2")}
                      >
                        Warden 2
                      </button>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => handleWselect("Warden 3")}
                      >
                        Warden 3
                      </button>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => handleWselect("Warden 4")}
                      >
                        Warden 4
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            <button className="bg-text-2 p-3 rounded-lg mt-5 text-white">
              Apply Gatepass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default S6_Form;
