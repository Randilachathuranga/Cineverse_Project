import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminHome.css';
import ViewAdminprofile from "../AdminProfile/ViewAdminprofile";
import Createfilm from "../../Filmmodel/FilmCreate/Createfilm";
import UpdateFilms from "../../Filmmodel/FilmUpdate/UpdateFilms";
import Createschedule from "../../Schedulemodel/ScheduleCreate/Createschedule";
import ViewShedulesupdatedelete from "../../Schedulemodel/ScheduleView/ViewShedulesupdatedelete";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState('AdminProfile');
  const [menuOpen, setMenuOpen] = useState(false); // State to handle hamburger menu
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false); // Close menu on tab click for mobile
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="admin-dashboard">
      <button className="hamburger-menu" onClick={toggleMenu}>
        <MenuRoundedIcon/>
      </button>
      <div className={`tabs-container ${menuOpen ? 'open' : ''}`}>
        <button 
          className={`tab ${activeTab === 'AdminProfile' ? 'active' : ''}`} 
          onClick={() => handleTabClick('AdminProfile')}
        >
          Admin Profile
        </button>
        <button 
          className={`tab ${activeTab === 'CreateFilm' ? 'active' : ''}`} 
          onClick={() => handleTabClick('CreateFilm')}
        >
          Create a Film
        </button>
        <button 
          className={`tab ${activeTab === 'UpdateFilms' ?
          'active' : ''}`} 
          onClick={() => handleTabClick('UpdateFilms')}
        >
          Show All Films
        </button>
        <button 
          className={`tab ${activeTab === 'CreateSchedule' ? 'active' : ''}`} 
          onClick={() => handleTabClick('CreateSchedule')}
        >
          Create Schedule
        </button>
        <button 
          className={`tab ${activeTab === 'ViewSchedules' ? 'active' : ''}`} 
          onClick={() => handleTabClick('ViewSchedules')}
        >
          View Schedules
        </button>
      </div>
      <div className="content-container">
        {activeTab === 'AdminProfile' && <ViewAdminprofile />}
        {activeTab === 'CreateFilm' && <Createfilm />}
        {activeTab === 'UpdateFilms' && <UpdateFilms />}
        {activeTab === 'CreateSchedule' && <Createschedule />}
        {activeTab === 'ViewSchedules' && <ViewShedulesupdatedelete />}
      </div>
    </div>
  );
}
