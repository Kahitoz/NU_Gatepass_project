import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentHome from "./StudentComponent/StudentsScreen/S1_Dashboard";
import StudentGatepass from "./StudentComponent/StudentsScreen/S2_Gatepasses"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/student/home" element={<StudentHome />}></Route>
          <Route exact path="/student/gatepass" element={<StudentGatepass/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
