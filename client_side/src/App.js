import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Student from "./StudentComponent/StudentsScreen/S1_Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/student/home" element={<Student />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
