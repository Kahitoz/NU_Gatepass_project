import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Guard from "./GuardComponent/GuardDashboard/GuardDashboard";
import Student from "./StudentComponent/StudentsScreen/S1_Dashboard";
import Warden from "./WardenComponent/WardenDashboard/WardenDashboard"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/guard" element={<Guard />}></Route>
          <Route exact path="/student/home" element={<Student />}></Route>
          <Route exact path="/Warden/home" element={<Warden />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
