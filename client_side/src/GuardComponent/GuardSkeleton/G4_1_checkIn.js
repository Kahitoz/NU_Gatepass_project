import React, { useEffect, useState } from 'react';
import designs from '../GuardStyling/G3_TableCSS';
import Cookies from 'js-cookie';
import moment from "moment";
import profilePhoto from '../../StudentComponent/icons/icon-profile.png';

function G4_1_checkIn(props) {
  const [profileImage, setProfileImage] = useState('');

  async function fetchUserImage(image) {
    if (!image) {
      setProfileImage(profilePhoto);
      return;
    }

    try {
      const accessToken = Cookies.get('ACCESS_TOKEN');
      const response = await fetch(`http://localhost:4000/gatepass/v2/student/image/${image}`, {
        headers: {
          Authorization: accessToken,
        },
      });

      if (response.ok) {
        const imageBlob = await response.blob();
        const imageURL = URL.createObjectURL(imageBlob);
        setProfileImage(imageURL);
      } else {
        setProfileImage(profilePhoto);
      }
    } catch (error) {
      console.error('Error fetching user image:', error);
      setProfileImage(profilePhoto);
    }
  }

  useEffect(() => {
    fetchUserImage(profileImage);
  }, []);

  return (
      <div>
        <div>
          <div className={`${designs.d1}`}>
            <div className={`${designs.d2}`}>
              <h1 className={`${designs.d5}`}>Image</h1>
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
            {props.search.length > 1 ? (
                props.filterData.map((item, idx) => (
                    <div className={`${designs.d4}`} key={idx}>
                      <img
                          src={profileImage || profilePhoto}
                          alt="User"
                          className={`${designs.d5},w-24 h-24 rounded-full `}
                          onLoad={() => fetchUserImage(item.image)}
                      />
                      <h1 className={`${designs.d5} `}>{item.name}</h1>
                      <h1 className={`${designs.d5}`}>{item.user_id}</h1>
                      <h1 className={`${designs.d5}`}>{item.contact_number}</h1>
                      <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
                      <h1 className={`${designs.d5}`}>
                        {moment(item.actual_out_date).utc().format('YYYY-MM-DD')} <br />{' '}
                        {moment(item.actual_out_time).utc().format('HH:mm:ss')}
                      </h1>
                      <h1 className={`${designs.d5}`}>
                        {moment(item.to_date).utc().format('YYYY-MM-DD')} <br />{' '}
                        {moment(item.to_time).utc().format('HH:mm:ss')}
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
                ))
            ) : (
                props.TbData.map((item, idx) => (
                    <div className={`${designs.d4}`} key={idx}>
                      <img src={profileImage} alt="User" className={`${designs.d5} `} />
                      <h1 className={`${designs.d5} `}>{item.name}</h1>
                      <h1 className={`${designs.d5}`}>{item.user_id}</h1>
                      <h1 className={`${designs.d5}`}>{item.contact_number}</h1>
                      <h1 className={`${designs.d5}`}>{item.gatepass_name}</h1>
                      <h1 className={`${designs.d5}`}>
                        {moment(item.actual_out_date).utc().format('YYYY-MM-DD')} <br />{' '}
                        {moment(item.actual_out_time).utc().format('HH:mm:ss')}
                      </h1>
                      <h1 className={`${designs.d5}`}>
                        {moment(item.to_date).utc().format('YYYY-MM-DD')} <br />{' '}
                        {moment(item.to_time).utc().format('HH:mm:ss')}
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
                ))
            )}
          </div>
        </div>
      </div>
  );
}

export default G4_1_checkIn;
