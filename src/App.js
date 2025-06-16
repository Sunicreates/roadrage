import { useState,useEffect } from 'react';
import Blogform from './Components/componentsofpage1/DressForm';
import M1 from './Mainpage';
import './Components/j.js/index.css';
import LandingPage from './Components/auth/Mainlanding';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userdata");
    if (storedUser) {
      setUserdata(JSON.parse(storedUser));
    }
    setLoading(false); 
  }, []);

  useEffect(() => {
    if (userdata) {
      localStorage.setItem("userdata", JSON.stringify(userdata));
    }
  }, [userdata]);
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="App" >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage  setUser={setUserdata}/>} />
          <Route path="/dashboard" element={<M1 user={userdata}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
