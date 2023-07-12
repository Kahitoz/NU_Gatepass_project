import { useState } from "react";
import designs from "../WardenStyling/W5_formCSS";

const W5_Form = () => {

  const [wselec, setWselect] = useState("");
  const [wOpen, setWopen] = useState(false);
  const Altwardens=["Narendra Bisht","Shail Deen"]


  const handleWselect = (option) => {
    setWselect(option);
    setWopen(false);
  };


  return (
    

      <div className={designs.d10}>
          <div className={`${designs.d11} mr-40 ml-40 mt-10`}>
          <div className={designs.d12}>
          <div className="flex justify-center bg-white rounded-md w-fit p-3">
            <h1 className="text-2xl text-Navbar_bg font-bold">Create Leave Gatepass</h1>
          </div>
          <p className="font-bold mb-2">Purpose of Visit</p>
                <input
                  type="text"
                  className={designs.d13}
                  placeholder="Purpose"
                />
                <p className="font-bold mb-2">Departure Date</p>
                <input
                  type="Date"
                  className={designs.d13}
                />
                <p className="font-bold mb-2">Arrival Date</p>
                <input
                  type="Date"
                  className={designs.d13}
                />
             
                <p className="font-bold mb-2">Choose Alternate</p>                 
                    <select className=" left-0 mt-2 py-2 w-40 bg-Items_bg font-bold  rounded-md shadow-lg z-10">
                      {Altwardens.map(warden => 
                      <option
                        className={`${designs.d13}`}
                        onClick={() => handleWselect(`${warden}`)}
                        key={warden}
                      >
                        {warden}
                      </option>)}
                    </select>
               
                </div>
                </div>
                </div>
               
              
           
  );
};

export default W5_Form;
