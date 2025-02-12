import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar'; // Import Sidebar
import EventCalendar from './components/EventCalendar';
import StudentProfile from './components/StudentProfile';
import Announcement from './components/Announcement';
import AdminDashboard from './components/AdminDashboard';
import SignUp from './components/SignUp';
import Admin from './components/Admin';

import './components/css/App.css';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  // Conditions to show Header and Sidebar based on the current path
  const showHeader = location.pathname !== '/' && location.pathname !== '/admindashboard' && location.pathname !== '/signup' && location.pathname !=='/Admin'; // Show header on all pages except Sign In
  const showSidebar = location.pathname !== '/' && location.pathname !== '/admindashboard' && location.pathname !== '/signup' && location.pathname !=='/Admin'; ; // Sidebar not shown on Sign In page
  


  return (
    <div className="App">
      {showHeader && <Header />}
      {showSidebar && <Sidebar />}
      <div className={`main-content ${showSidebar ? 'with-sidebar' : 'no-sidebar'}`}>
        <main>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/eventCalendar" element={<EventCalendar />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<Admin />} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
