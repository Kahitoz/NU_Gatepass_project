import React from 'react'
import designs from '../GuardStyling/G3_TableCSS'
import moment from 'moment'

function G4_1_checkIn(props) {
  return (
    <div >
      <div>
        <div className={`${designs.d1}`}>
          <div className={`${designs.d2}`}>
            <h1 className={`${designs.d5}`}>Name</h1>
            <h1 className={`${designs.d5}`}>Enrollment</h1>
            <h1 className={`${designs.d5}`}>Call On</h1>
            <h1 className={`${designs.d5}`}>Gatepass Type</h1>
            <h1 className={`${designs.d5}`}>Actual Departure</h1>
            <h1 className={`${designs.d5}`}>Expected Arrival</h1>
            <h1 className={`${designs.d5}`}>Status</h1>
            <h1 className={`${designs.d5}`}>Actions</h1>
          </div>
        </div>

        <div className={`${designs.d3}`}>
          {props.TbData.map((item, idx) => (
            <div className={`${designs.d4}`} key={idx}>
              <h1 className={`${designs.d5} `}>{item.name}</h1>
              <h1 className={`${designs.d5}`}>{item.user_id}</h1>
              <h1 className={`${designs.d5}`}>{item.contact_number}</h1>
              <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
              <h1 className={`${designs.d5}`}>
              {moment(item.actual_out_date)
                          .utc()
                          .format("YYYY-MM-DD")}{" "}
                        <br />{" "}
                        {moment(item.actual_out_time).utc().format("HH:mm:ss")}
              </h1>
              <h1 className={`${designs.d5}`}>
              {moment(item.to_date).utc().format("YYYY-MM-DD")}{" "}
                        <br /> {moment(item.to_time).utc().format("HH:mm:ss")}
              </h1>
              <h1 className={`${designs.d5}`}>{item.status}</h1>
              <div className={`${designs.d5}`}>
                <button
                  id={`button ${idx}`}
                  name={item.request_id}
                  onClick={(e) => props.handleApprove(e)}
                  className=" bg-Navbar_bg p-2 text-white hover:border-2"
                >
                  {props.SubNavOption}
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
  )
}

export default G4_1_checkIn