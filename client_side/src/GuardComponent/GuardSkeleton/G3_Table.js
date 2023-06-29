import designs from "../GuardStyling/G3_TableCSS";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Cookies from "js-cookie";

const G3_table = (props) => {
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const [data, setData] = useState([]);
  const [pgNo, setPgNo] = useState(1);
  const [TbData, setTbData] = useState([]);

  let url = "";

  useEffect(() => {
    if (props.NavOption === "Students") {
      if (props.SubNavOption === "Check Out") {
        url = "http://localhost:4000/gatepass/v2/guard/approved_students";
      }
      if (props.SubNavOption === "Check In") {
        url = "http://localhost:4000/gatepass/v2/guard/checked_out_students";
      }
    }
  }, [props.NavOption, props.SubNavOption]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: accessToken,
          },
        });
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setPgNo(1);
  }, [url, accessToken, props.SubNavOption]);

  useEffect(() => {
    const paginate = (array, page_size, page_number) => {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    };

    const paginatedData = paginate(data, 5, pgNo);
    setTbData(paginatedData);
  }, [pgNo, data]);

  const handleNextPage = () => {
    setPgNo((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (pgNo > 1) {
      setPgNo((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="bg-background">
      <div className="flex justify-center"></div>
      <div>
        <div className={`${designs.d1}`}>
          <div className={`${designs.d2}`}>
            <h1 className={`${designs.d5}`}>Name</h1>
            <h1 className={`${designs.d5}`}>Enrollment</h1>
            <h1 className={`${designs.d5}`}>Gatepass Type</h1>
            <h1 className={`${designs.d5}`}>Applied Date</h1>
            <h1 className={`${designs.d5}`}>Applied Time</h1>
            <h1 className={`${designs.d5}`}>Actions</h1>
          </div>
        </div>

        <div className={`${designs.d3}`}>
          {TbData.map((item, idx) => (
            <div className={`${designs.d4}`} key={idx}>
              <h1 className={`${designs.d5} `}>{item.name}</h1>
              <h1 className={`${designs.d5}`}>{item.user_id}</h1>
              <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
              <h1 className={`${designs.d5}`}>
                {moment(item.from_date).format("YYYY-MM-DD")}
              </h1>
              <h1 className={`${designs.d5}`}>
                {moment(item.from_time).format("HH:mm:ss")}
              </h1>
              <h1 className={`${designs.d5}`}>
                <button
                  id="button2"
                  name={item.request_id}
                  className=" bg-Navbar_bg p-2 text-white hover:border-2"
                >
                  {props.SubNavOption}
                </button>
              </h1>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
            onClick={handlePreviousPage}
            disabled={pgNo === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
            onClick={handleNextPage}
            disabled={TbData.length < 5}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default G3_table;
