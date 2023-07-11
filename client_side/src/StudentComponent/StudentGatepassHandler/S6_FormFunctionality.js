import React, { useEffect, useState } from "react";
import moment from "moment";
import Cookies from "js-cookie";
import LFfunctions from "./S1_LocalFixed";
import { week } from "./S1_ParameterConfig";
import S6_FormDesigns from "../StudentSkeleton/S6_Form";
import { get_warden_details } from "./S1_LocalFlexible";
import { handle_submit } from "./S1_LocalFlexible";

const S6_FormFunctionality = () => {
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
  const [warden, setWarden] = useState("");
  const [reason, setReason] = useState("");
  const accessToken = Cookies.get("ACCESS_TOKEN");

  const [lf_departureTime, set_lf_departureTime] = useState("");

  const date = moment();
  const formatted_Date = date.format("YYYY-MM-DD");

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

    const get_warden = async () =>{
      let warden = await get_warden_details(accessToken);
      setWarden(warden.warden_name)
    }
    get_warden();

    

    setDepartureDate(formatted_Date);
    setArrivalDate(formatted_Date);
    console.log("date  = ", departureDate);
  }, []);

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
    } else if (option === "Outstation") {
      setDestinationVisible(true);
      setReasonVisible(true);
      setWardenVisible(true);
    } else if (option === "Emergency") {
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

  const handleButtonClick = () => {
    if (selectedOption === "Local Fixed") {
      handleClick()
    } else if (selectedOption === "Local Flexible") {
      handle_submit(accessToken, departureDate, lf_departureTime, arrivalDate, arrivalTime, reason)
      console.log("The time is - ",lf_departureTime);
    } else if (selectedOption === "Outstation") {
      alert("You have clicked on Outstation!");
    } else if (selectedOption === "Emergency") {
      alert("You have clicked on Emergency!");
    }
  };

  const Altwardens = [warden];


  return (
    <S6_FormDesigns
      selectedOption={selectedOption}
      departureDateVisible={departureDateVisible}
      departureTimeVisible={departureTimeVisible}
      arrivalDateVisible={arrivalDateVisible}
      arrivalTimeVisible={arrivalTimeVisible}
      destinationVisible={destinationVisible}
      reasonVisible={reasonVisible}
      wardenVisible={wardenVisible}
      departureTime={departureTime}
      arrivalTime={arrivalTime}
      handleOptionSelect={handleOptionSelect}
      handleWselect={handleWselect}
      handlewDropDown={handlewDropDown}
      wselec={wselec}
      wOpen={wOpen}
      Altwardens={Altwardens}
      handleClick={handleButtonClick}
      reason={reason}
      setReason = {setReason}
      lf_departureTime = {set_lf_departureTime}
      d_Time = {lf_departureTime}
    />
  );
};

export default S6_FormFunctionality;
