import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Student from './StudentComponent/StudentsDashboard/Student';


function App() {
  return(
    <div>
      <Router>
        <Routes>
        <Route exact path = "*" element={<Student/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
