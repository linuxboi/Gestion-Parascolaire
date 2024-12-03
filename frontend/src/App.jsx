import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserManagement from './pages/Pagetest'
import UserManagementWithAxios from './pages/axiostest';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route for the Page component */}
        <Route path="/" element={<UserManagement />} />
        <Route path="/axios" element={<UserManagementWithAxios />} />
      </Routes>
    </Router>
  );
};

export default App