import './App.css';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Short from './Components/Short';

function App() {
  const BACKEND_URL = 'https://u-d9d3.onrender.com'; 
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home BACKEND_URL={BACKEND_URL}/>}></Route>
          <Route exact path="/:id" element={<Short BACKEND_URL={BACKEND_URL}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
