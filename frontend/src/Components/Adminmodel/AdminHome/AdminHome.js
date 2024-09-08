import './AdminHome.css';

import React, { useState } from "react";

import Createfilm from "../../Filmmodel/FilmCreate/Createfilm";
import Createschedule from "../../Schedulemodel/ScheduleCreate/Createschedule";
import UpdateFilms from "../../Filmmodel/FilmUpdate/UpdateFilms";
import ViewAdminprofile from "../AdminProfile/ViewAdminprofile";
import ViewShedulesupdatedelete from "../../Schedulemodel/ScheduleView/ViewShedulesupdatedelete";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState('AdminProfile');
  const [menuOpen, setMenuOpen] = useState(false); // State to handle hamburger menu

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
          <AccountBoxRoundedIcon />
          Admin Profile
        </button>
        <button 
          className={`tab ${activeTab === 'CreateFilm' ? 'active' : ''}`} 
          onClick={() => handleTabClick('CreateFilm')}
        >
          <AddBoxRoundedIcon/>
          Create a Film
        </button>
        <button 
          className={`tab ${activeTab === 'UpdateFilms' ?
          'active' : ''}`} 
          onClick={() => handleTabClick('UpdateFilms')}
        >
          <LocalMoviesRoundedIcon/>
          Show All Films
        </button>
        <button 
          className={`tab ${activeTab === 'CreateSchedule' ? 'active' : ''}`} 
          onClick={() => handleTabClick('CreateSchedule')}
        >
          <EditCalendarRoundedIcon/>
          Create Schedule
        </button>
        <button 
          className={`tab ${activeTab === 'ViewSchedules' ? 'active' : ''}`} 
          onClick={() => handleTabClick('ViewSchedules')}
        >
          <EventRoundedIcon/>
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
