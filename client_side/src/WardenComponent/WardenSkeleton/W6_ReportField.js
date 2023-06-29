import { useState } from "react";
const W6_ReportField = () => {
  const [wselec, setWselect] = useState("");
  const [wOpen, setWopen] = useState(false);
  const Altwardens = ["Student Tenure", "Defaulter", "Blocked"];

  const handleWselect = (option) => {
    setWselect(option);
    setWopen(false);
  };
  return (
    <div className="bg-background">
      <div className="bg-Items_bg p-4 mt-5 ms-5 me-5 mb-5 rounded-lg items-center ">
        <div>
          <h1 className="font-bold mb-2">Search Student</h1>
        </div>
        <div className="flex items-center flex-col sm:flex-row">
          <h1 className="me-2 font-bold">Student Info:</h1>
          <input
            type="text"
            className="me-2 p-2 rounded-lg"
            placeholder="Search Student"
          />
          <button className="bg-text-2 p-2 me-4 text-white rounded-lg mt-3 sm:mt-0">
            Get Complete Report
          </button>
          <button className="bg-text-2 p-2 text-white rounded-lg mt-3 sm:mt-0">
            Download Excel
          </button>
        </div>
      </div>

      <div className="bg-Items_bg p-4 rounded-lg ms-4 me-4">
        <div className="">
          <select className=" left-0 mt-2 py-2 w-40 bg-Items_bg font-bold  rounded-md shadow-lg z-10">
            {Altwardens.map((warden) => (
              <option
                className="bg-backgorund"
                onClick={() => handleWselect(`${warden}`)}
                key={warden}
              >
                {warden}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className="me-2 p-2 mt-4 rounded-lg"
            placeholder="Student Name"
          />

          <input
            type="text"
            className="me-2 p-2 mt-4 rounded-lg"
            placeholder="From Date"
          />

          <input
            type="text"
            className="me-2 p-2 mt-4 rounded-lg"
            placeholder="To Date"
          />

          <input
            type="text"
            className="me-2 p-2 mt-4 rounded-lg"
            placeholder="Select Status"
          />
        </div>
        <div className="mt-4 items-center">
          <button className="bg-text-2 p-2 me-4 text-white rounded-lg">
            Get Complete Report
          </button>
          <button className="bg-text-2 p-2 text-white rounded-lg">
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};
export default W6_ReportField;
