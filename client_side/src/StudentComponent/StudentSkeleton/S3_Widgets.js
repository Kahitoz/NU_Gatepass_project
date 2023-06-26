import designs from "../StudentStyling/S3_WidgetsCSS"
const S3_Widgets = () => {
  return (
    <div className={`${designs.d1}`}>
      <div className={`${designs.d2 }`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
            <h1 className={`font-bold me-2`}>Local Fixed Gatepass Available:</h1>
            <p>3</p>
      </div>
    
      </div>

      <div className={`${designs.d2}`}>
        <h1 className={`text-green-500 font-bold`}>Gatepass Allowed</h1>
      </div>

      <div className={`${designs.d2}`}>
      <div className={`items-center justify-center text-center flex flex-col sm:flex-row`}>
         <h1 className={`font-bold me-2`}>Last Gatepass Status:</h1>
         <p className={`text-blue-700`}>Pending</p>
      </div>
       
      </div>
    </div>
  );
};
export default S3_Widgets;
