import profile from "../icons/icon-profile.png";
import designs from "../StudentStyling/S5_ProfileCSS";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import profilePhoto from "../icons/icon-profile.png"

const S5_Profile = () => {
  const [userName, setUserName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentHostel, setStudentHostel] = useState("");
  const [studentEnrollment, setStudentEnrollment] = useState("");
  const [studentContact, setStudentContact] = useState("");
  const [profilePath , setProfilePath] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const userToken = Cookies.get("ACCESS_TOKEN");



  useEffect(() => {
    const userToken = Cookies.get("ACCESS_TOKEN");
    const decoded = jwt_decode(userToken);
    const email = decoded.data.email_id;

    async function fetchUserDetails() {
      const response = await fetch(`http://127.0.0.1:4000/gatepass/v2/user_details/${email}`, {
        headers: {
          Authorization: userToken,
        },
      });
      const data = await response.json();
      setUserName(data.name);
      setStudentName(data.name);
      setStudentHostel(data.hostel);
      setStudentEnrollment(data.user_id);
      setStudentContact(data.contact_number);
      setProfilePath(data.image);
    }
    fetchUserDetails();

    async function fetchUserImage(image) {
      if (!image) {
        setProfileImage(profilePhoto);
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/gatepass/v2/student/image/${image}`, {
          headers: {
            Authorization: userToken,
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

    fetchUserImage(profilePath);

  }, [profilePath]);


  return (
    <div className={`${designs.d1}`}>
      <div className={`${designs.d2}`}>
        <div className={`${designs.d3}`}>
          <div className={`${designs.d4}`}>
            <div className={`${designs.d6}`}>
              <img
                  src={profileImage || profilePhoto}
                  alt="User"
                  className={`w-24 h-24 rounded-full`}
                  onLoad={() =>  profileImage}
              />
            </div>
            <div className={`${designs.d7}`}>
              <div className={`${designs.d8}`}>
                <button className={`${designs.d9}`}>Request Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${designs.d10}`}>
        <div className={`${designs.d11}`}>
          <div className={`${designs.d12}`}>
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Name"
              value={studentName}
              disabled
            />
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Hostel"
              value={studentHostel}
              disabled
            />
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Enrolment"
              value={studentEnrollment}
              disabled
            />
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Contact Number"
              value={studentContact}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default S5_Profile;
