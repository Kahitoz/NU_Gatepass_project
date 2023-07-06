import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Guard from "./GuardComponent/GuardDashboard/GuardDashboard";
import WardenPendingRequests from "./WardenComponent/WardenScreens/WardenPendingRequest"
import WardenApprovedCancelled from "./WardenComponent/WardenScreens/WardenApprovedCancelled"
import StudentHome from "./StudentComponent/StudentsScreen/S1_Dashboard";
import StudentGatepass from "./StudentComponent/StudentsScreen/S2_Gatepasses"
import Login from "./OAuthComponent/O1_Login"
import WardenApplyLeave from "./WardenComponent/WardenScreens/WardenApplyLeave";
import WardenReport from "./WardenComponent/WardenScreens/WardenReport";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/guard" element={<Guard />}></Route>
          <Route exact path="/Warden/home" element={<WardenPendingRequests />}></Route>
          <Route exact path="/Warden/home/ApprovedCancelled" element={<WardenApprovedCancelled />}></Route>
          {/* <Route exact path="/Warden/home/AutoApproved" element={<WardenReport />}></Route> */}
          <Route exact path="/Warden/home/VisitorRequests" element={<WardenReport />}></Route>
          <Route exact path="/Warden/reports" element={<WardenReport />}></Route>
          <Route exact path="/Warden/ApplyLeave" element={<WardenApplyLeave />}></Route>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/student/home" element={<StudentHome />}></Route>
          <Route exact path="/student/gatepass" element={<StudentGatepass />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
