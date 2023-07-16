import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Guard from "./GuardComponent/GuardDashboard/GuardDashboard";
import WardenPendingRequests from "./WardenComponent/WardenScreens/WardenPendingRequest"
import WardenApprovedCancelled from "./WardenComponent/WardenScreens/WardenApprovedCancelled"
import StudentHome from "./StudentComponent/StudentsScreen/S1_Dashboard";
import StudentGatepass from "./StudentComponent/StudentsScreen/S2_Gatepasses"
import Login from "./OAuthComponent/O1_Login"
import WardenApplyLeave from "./WardenComponent/WardenScreens/WardenApplyLeave";
import WardenReport from "./WardenComponent/WardenScreens/WardenReport";
import WardenVisitorRequest from "./WardenComponent/WardenScreens/WardenVisitorRequest";
import WardenAutoApproved from "./WardenComponent/WardenScreens/WardenAutoApproved";
import WardenLeaveManagement from "./WardenComponent/WardenScreens/WardenLeaveManagement";
import A1_Home from "./AdminComponent/A1_AdminScreen/A1_Home"
import A2_Reports from "./AdminComponent/A1_AdminScreen/A2_Reports";
import ChiefWardenHome from "./ChiefWardenComponent/ChiefWardenScreens/ChiefWardenGatepassRequest";
import ChiefWardenAutoApproved from "./ChiefWardenComponent/ChiefWardenScreens/ChiefWardenAutoApproved";
import ChiefWardenBlocked from "./ChiefWardenComponent/ChiefWardenScreens/ChiefWardenBlocked ";
import ChiefWardenReport from "./ChiefWardenComponent/ChiefWardenScreens/ChiefWardenReport";
import ChiefWardenTowerAllot from "./ChiefWardenComponent/ChiefWardenScreens/ChiefWardenTowerAllot";
import ChiefWardenNotifications from "./ChiefWardenComponent/ChiefWardenScreens/ChiefWardenNotifications";
import ChiefWardenProfileRequests from "./ChiefWardenComponent/ChiefWardenScreens/ChiefWardenProfileRequests";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>


          <Route exact path="/guard" element={<Guard />}></Route>


          <Route exact path="/Warden/home" element={<WardenPendingRequests />}></Route>
          <Route exact path="/Warden/home/ApprovedCancelled" element={<WardenApprovedCancelled />}></Route>
          <Route exact path="/Warden/home/AutoApproved" element={<WardenAutoApproved />}></Route>
          <Route exact path="/Warden/home/VisitorRequest" element={<WardenVisitorRequest />}></Route>
          <Route exact path="/Warden/home/VisitorRequests" element={<WardenReport />}></Route>
          <Route exact path="/Warden/reports" element={<WardenReport />}></Route>
          <Route exact path="/Warden/Leave/ApplyLeave" element={<WardenApplyLeave />}></Route>
          <Route exact path="/Warden/Leave/LeaveManagement" element={<WardenLeaveManagement />}></Route>




          <Route exact path="/student/home" element={<StudentHome />}></Route>
          <Route exact path="/student/gatepass" element={<StudentGatepass />}></Route>
          <Route exact path = "/admin/dashboard" element={<A1_Home/>}></Route>
          <Route exact path = "/admin/reports" element={<A2_Reports/>}></Route>

          <Route exact path="/ChiefWarden/home" element={<ChiefWardenHome />}></Route>
          <Route exact path="/ChiefWarden/home/AutoApproved" element={<ChiefWardenAutoApproved />}></Route>
          <Route exact path="/ChiefWarden/home/Notifications" element={<ChiefWardenNotifications />}></Route>
          <Route exact path="/ChiefWarden/home/ProfileRequests" element={<ChiefWardenProfileRequests />}></Route>
          <Route exact path="/ChiefWarden/home/Blocked" element={<ChiefWardenBlocked />}></Route>
          <Route exact path="/ChiefWarden/reports" element={<ChiefWardenReport />}></Route>
          <Route exact path="/ChiefWarden/TowerAllot" element={<ChiefWardenTowerAllot />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
