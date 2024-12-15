import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserManagement from './pages/Pagetest'
import UserManagementWithAxios from './pages/axiostest';
import Connexion from './pages/connexion/connexionPage';
import Calendrier from './pages/events/events'
import Clubs from './pages/clubs/clubs'
import ImageGrid from './components/ForumCommun';
import Navbar from './components/Navbar';
import EventHistory from './components/EventHistory/EventHistory';
import EventParticipation from './pages/calendar/calendar';
import Events from './pages/events/events'

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Define the route for the Page component */}
        
        
        <Route path="/" element={<Connexion/>}/>
       
        <Route path="/forumCommun" element={<ImageGrid/>}/>
        <Route path="/calendar" element={<EventParticipation/>}/>
        <Route path="/clubs" element={<Clubs/>}/>
        <Route path="/events" element={<Events/>}/>
       
        
      </Routes>
    </Router>
  );
};

export default App