import designs from "../StudentStyling/S3_WidgetsCSS"
const S3_Widgets = () => {
  return (
    <div className={`${designs.d1}`}>
      <div className={`${designs.d2 }`}>
        <h1>Local Fixed Gatepass Available: 3</h1>
      </div>

      <div className={`${designs.d2}`}>
        <h1>Gatepass Allowed</h1>
      </div>

      <div className={`${designs.d2}`}>
        <h1>Last Gatepass Status</h1>
      </div>
    </div>
  );
};
export default S3_Widgets;
