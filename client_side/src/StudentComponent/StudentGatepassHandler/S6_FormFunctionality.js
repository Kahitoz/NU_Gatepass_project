import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LFfunctions from "./S1_LocalFixed";
import { week } from "./S7_ParameterConfig";
import S6_FormDesigns from "../StudentSkeleton/S6_Form";
import { get_warden_details } from "./S0_CommonChecks";
import { handle_submit_local_flexible } from "./S2_LocalFelxible";
import {handle_Outstation} from "./S3_Outstation";
import {handle_Emergency} from "./S4_Emergency";
import moment from 'moment'
import G1_MessageModal from "../../GlobalComponent/G1_Modals/G1_MessageModal";
import {check_todays_gatepass} from "./S0_CommonChecks";
import {check_valid_day} from "./S8_AutoApprovalCheck";
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
  const [lf_departureTime, set_lf_departureTime] = useState("");
  const [og_departureDate, set_og_departureDate] = useState("");
  const [og_arrivalDate, set_og_arrivalDate] = useState("");
  const [destination, setDestination] = useState("");
  const [og_arrivalTime, set_og_arrivalTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("")
  const [checkToadyGatepass, setTodayGatepass] = useState(false)
  const [autoApprovalDay, setAutoApprovalDay] = useState(false)

  const date = moment();
  const formatted_Date = date.format("YYYY-MM-DD");

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

    const get_warden = async () =>{
      let warden = await get_warden_details(accessToken);
      setWarden(warden.warden_name)
    }
    get_warden();
    setDepartureDate(formatted_Date);
    setArrivalDate(formatted_Date);

    const getToday = async () => {
      setTodayGatepass(await check_todays_gatepass(accessToken))
      if(await check_todays_gatepass(accessToken) === true){
        console.log("you have applied for the gatepass today")
      }else{
        console.log("You have not applied for the gatepass today")
      }
    }

    getToday()

    const fetchIsValidDay = async () => {
      const result = await check_valid_day(accessToken);
      setAutoApprovalDay(result);
    };

    fetchIsValidDay();
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
        setModalTitle("Success");
        setModalMessage("You have successfully applied for Local Fixed Gatepass!");
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      // Handle the error here
      setModalTitle("Error");
      setModalMessage("An error occurred while applying for Local Fixed Gatepass!");
      setShowModal(true);
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
      handle_submit_local_flexible(accessToken,departureTime, arrivalTime, lf_departureTime, arrivalDate, departureDate, reason, setModalTitle, setModalMessage, setShowModal);
    } else if (selectedOption === "Outstation") {
      handle_Outstation(accessToken,departureTime, og_arrivalTime, lf_departureTime, og_arrivalDate, og_departureDate, reason, destination, setModalTitle, setModalMessage, setShowModal);
    } else if (selectedOption === "Emergency") {
      handle_Emergency(accessToken,departureTime, og_arrivalTime, lf_departureTime, og_arrivalDate, og_departureDate, reason, destination, setModalTitle, setModalMessage, setShowModal)
    }
  };

  const Altwardens = [warden];


  return (
      <>
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
            og_arrivalDate = {set_og_arrivalDate}
            og_departureDate = {set_og_departureDate}
            destination = {destination}
            set_destination = {setDestination}
            set_og_arrivalTime = {set_og_arrivalTime}
            og_arrivalTime = {og_arrivalTime}
            checkTodayGatepass = {checkToadyGatepass}
            autoApprovalDay = {autoApprovalDay}
        />
        {showModal && <G1_MessageModal title={modalTitle} message={modalMessage} action={setShowModal}/>}

      </>

  );
};

export default S6_FormFunctionality;
