import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHome from "./StudentComponent/StudentsScreen/S1_Dashboard";
import StudentGatepass from "./StudentComponent/StudentsScreen/S2_Gatepasses"
import Login from "./OAuthComponent/O1_Login"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path = "/login" element={<Login/>}></Route>
          <Route exact path="/student/home" element={<StudentHome />}></Route>
          <Route exact path="/student/gatepass" element={<StudentGatepass/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
