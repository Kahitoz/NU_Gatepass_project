import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Student from "./StudentComponent/StudentsDashboard/StudentDashboard";
import Guard from "./GuardComponent/GuardDashboard/GuardDashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="*" element={<Student />}></Route>
          <Route exact path="/guard" element={<Guard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
