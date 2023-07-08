import moment from "moment";
import { React, useState } from "react";
import Cookies from "js-cookie";

export default function W7_Modal({ setOpenModal, data }) {
  const [remarks, setRemarks] = useState("NA");
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const [required, setRequired] = useState("")

  const handleRemarks = async (event) => {
    const remarkGiven = event.target.value;
    setRemarks(remarkGiven);
  };

  const handleApprove = async (event) => {
    await fetch("http://localhost:4000/gatepass/v2/warden/approve_gatepass", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        comments: remarks,
        request_id: data[0].request_id,
      }),
    }).then((Response) => Response.text());

    window.location.reload(true);
    setOpenModal(false);
    setRemarks("NA")
  };

  const handleReject = async (event) => {
    
    if (remarks==="NA" || remarks===""){
        setRequired("*Remarks required!")
    }
    
    else{
        await fetch("http://localhost:4000/gatepass/v2/warden/reject_Gatepass", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        comments: remarks,
        request_id: data[0].request_id,
      }),
    }).then((Response) => Response.text());



    window.location.reload(true);
    setOpenModal(false);
    setRemarks("NA")
    }
    
  };

  return (
    <>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="flex-auto w-64 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t bg-[#85151C]">
              <h3 className="text-3xl font-semibold text-white">
                {data[0].name} - {data[0].user_id}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {setOpenModal(false);setRemarks("NA")}}
              >
                <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="table-auto min-w-full border text-left text-base font-light">
                      <tbody>
                      <tr className="rounded-full border-b  dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-2 font-bold bg-neutral-100">
                            Parent's Contact
                          </td>
                          <td className="whitespace-nowrap px-6 py-2 font-medium">
                            {data[0].p_number}
                          </td>
                        </tr>
                        <tr className="rounded-full border-b  dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-2 bg-neutral-100 font-bold">
                            Departure Date:
                          </td>
                          <td className="whitespace-nowrap px-6 py-2 font-medium">
                            {moment(data[0].from_date).utc().format("DD-MM-YY")}{" "}
                            |{" "}
                            {moment(data[0].from_time)
                              .utc()
                              .format("hh:mm:ss A")}
                          </td>
                        </tr>
                        <tr className="rounded-full border-b  dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-2 font-bold bg-neutral-100">
                            Arrival Date:
                          </td>
                          <td className="whitespace-nowrap px-6 py-2 font-medium">
                            {moment(data[0].to_date).utc().format("DD-MM-YY")} |{" "}
                            {moment(data[0].to_time).utc().format("hh:mm:ss A")}
                          </td>
                        </tr>
                        <tr className="rounded-full border-b  dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-2 font-bold bg-neutral-100">
                            Visit to:
                          </td>
                          <td className="whitespace-normal px-6 py-2 font-medium">
                            {data[0].visit_to}
                          </td>
                        </tr>
                        <tr className="rounded-full border-b  dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-2 font-bold bg-neutral-100">
                            Purpose:
                          </td>
                          <td className="whitespace-normal px-6 py-2 font-medium">
                            {data[0].purpose}
                          </td>
                        </tr>
                        <tr className="rounded-full border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-2 font-bold bg-neutral-100">
                            Destination:
                          </td>
                          <td className="whitespace-normal px-6 py-2 font-medium">
                            {data[0].destination}
                          </td>
                        </tr>
                        <tr className="rounded-full border-b dark:border-neutral-500 ">
                          <td className="whitespace-nowrap px-6 py-2 font-bold bg-neutral-100">
                            Remarks:
                          </td>
                          <td className="whitespace-normal px-2 py-2 font-medium">
                            <textarea
                              rows="3"
                              placeholder="Your remarks"
                              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear"
                              id="remarksInput"
                              onChange={handleRemarks}
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-6 text-red-500">{required}</div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-[#C9302C] text-white active:bg-red-500 font-bold uppercase text-sm px-8 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleReject}
              >
                REJECT
              </button>
              <button
                className="bg-[#449D44] text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleApprove}
              >
                APPROVE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
