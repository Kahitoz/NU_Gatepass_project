import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Guard from "./GuardComponent/GuardDashboard/GuardDashboard";
import Student from "./StudentComponent/StudentsScreen/S1_Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/guard" element={<Guard />}></Route>
          <Route exact path="/student/home" element={<Student />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
