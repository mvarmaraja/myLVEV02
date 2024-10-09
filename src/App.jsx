import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import AlertList from './components/Alerts/AlertList';
import UserProfile from './components/Profile/UserProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/alerts" element={<AlertList />} />
          <Route path="/profile" element={<UserProfile />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;