import profile from "../icons/icon-profile.png";
import designs from "../StudentStyling/S5_ProfileCSS"
const S5_Profile = () => {
  return (
    <div className={`${designs.d1}`}>
      <div className={`${designs.d2}`}>
        <div className={`${designs.d3}`}>
          <div className={`${designs.d4}`}>
            <div className={`${designs.d6}`}>
              <img src={profile} alt="profile"></img>
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
            />
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Hostel"
            />
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Enrolment"
            />
            <input
              type="text"
              className={`${designs.d13}`}
              placeholder="Student Contact Number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default S5_Profile;
