import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import About from './Components/About/About';
import AdminAccount from './Components/Adminmodel/AdminAccount/AdminAccount';
import AdminHome from './Components/Adminmodel/AdminHome/AdminHome';
import Adminlogin from './Components/Adminmodel/AdminLogin/Adminlogin';
import BookingCancel from './Components/Bookingmodel/BookingCancel/BookingCancel';
import Contact from './Components/ContactUs/Contact';
import CreateBooking from './Components/Bookingmodel/BookingCreate/CreateBooking';
import Createfilm from './Components/Filmmodel/FilmCreate/Createfilm';
import Createschedule from './Components/Schedulemodel/ScheduleCreate/Createschedule';
import Footer from './Components/Footer/Footer';
import GetAllBooking from './Components/Bookingmodel/BookingGetAll/GetAllBooking';
import GetAllBookingsbyUser from './Components/Bookingmodel/BookingGetAllByUser/GetAllBookingsbyUser';
import Getallfilms from './Components/Filmmodel/FilmsGet/Getallfilms';
import GetallfilmsforGeust from './Components/Filmmodel/FilmsGet/GetallfilmsforGuest';
import Home from './Components/Home/Home';
import NavBar from './Components/Navbar/NavBar';
import Payment from './Components/Bookingmodel/BookingCreate/Payment';
import React from 'react';
import UpdateAdmin from './Components/Adminmodel/AdminUpdate/UpdateAdmin';
import UpdateDeleteScheduleForm from './Components/Schedulemodel/ScheduleUpdate/UpdateDeleteScheduleForm';
import UpdateFilms from './Components/Filmmodel/FilmUpdate/UpdateFilms';
import UpdatedeleteForm from './Components/Filmmodel/FilmUpdateDelete/UpdatedeleteForm';
import Updateprofile from './Components/Usermodel/UserProfileUpdate/Updateprofile';
import UserHome from './Components/Usermodel/UserHome/UserHome';
import Userlogin from './Components/Usermodel/UserLogin/Userlogin';
import Userregistration from './Components/Usermodel/UserRegistration/Userregistration';
import ViewAdminprofile from './Components/Adminmodel/AdminProfile/ViewAdminprofile';
import ViewShedulesupdatedelete from './Components/Schedulemodel/ScheduleView/ViewShedulesupdatedelete';
import Viewfilmbyid from './Components/Filmmodel/FilmView/ViewfilmbyId';
import ViewfimlbyidforGuest from './Components/Filmmodel/FilmView/ViewfimlbyidforGuest';
import Viewprofile from './Components/Usermodel/UserProfileView/Viewprofile';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  const isAdminLoginPage = location.pathname === '/Adminlogin';
  const isAdminAccount = location.pathname === '/AdminAccount';
  const isAdminUpdate = location.pathname === '/UpdateAdmin';
  const isViewAdminProfile = location.pathname === '/ViewAdminprofile';
  const isCreateFilm = location.pathname === '/Createfilm';
  const isUpdateFilms = location.pathname === '/UpdateFilms';
  const isUpdateDeleteForm = location.pathname === '/UpdatedeleteForm';
  const isCreateSchedule = location.pathname === '/Createschedule';
  const isViewScheduleUpdateDelete = location.pathname === '/ViewScheduleupdatedelete';
  const isUpdateDeleteScheduleForm = location.pathname === '/UpdateDeleteScheduleForm';
  const isGetAllBooking = location.pathname === '/GetAllBooking';
  const isAdminHome = location.pathname === '/AdminHome';

  const shouldRenderNavBar =
    !isAdminLoginPage &&
    !isAdminAccount &&
    !isAdminUpdate &&
    !isViewAdminProfile &&
    !isCreateFilm &&
    !isUpdateFilms &&
    !isUpdateDeleteForm &&
    !isCreateSchedule &&
    !isViewScheduleUpdateDelete &&
    !isUpdateDeleteScheduleForm &&
    !isGetAllBooking &&
    !isAdminHome;

  return (
    <div>
      {shouldRenderNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        {/* User role */}
        <Route path="/Userhome" element={<UserHome />} />
        <Route path="/Userregistration" element={<Userregistration />} />
        <Route path="/Userlogin" element={<Userlogin />} />
        <Route path="/Viewprofile" element={<Viewprofile />} />
        <Route path="/Updateprofile" element={<Updateprofile />} />

        {/* Admin role */}
        <Route path="/Adminlogin" element={<Adminlogin />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminAccount" element={<AdminAccount />} />
        <Route path="/ViewAdminprofile" element={<ViewAdminprofile />} />
        <Route path="/UpdateAdmin" element={<UpdateAdmin />} />

        {/* Film options */}
        <Route path="/Createfilm" element={<Createfilm />} />
        <Route path="/Getallfilms" element={<Getallfilms />} />
        <Route path="/GetallfilmsforGeust" element={<GetallfilmsforGeust />} />
        <Route path="/Viewfilmbyid" element={<Viewfilmbyid />} />
        <Route path="/ViewfimlbyidforGuest" element={<ViewfimlbyidforGuest />} />
        <Route path="/UpdateFilms" element={<UpdateFilms />} />
        <Route path="/UpdatedeleteForm" element={<UpdatedeleteForm />} />

        {/* Schedule model */}
        <Route path="/Createschedule" element={<Createschedule />} />
        <Route path="/UpdateDeleteScheduleForm" element={<UpdateDeleteScheduleForm />} />
        <Route path="/ViewShedulesupdatedelete" element={<ViewShedulesupdatedelete />} />

        {/* Booking model */}
        <Route path="/Payment" element={<Payment />} />
        <Route path="/CreateBooking" element={<CreateBooking />} />
        <Route path="/GetAllBookingsbyUser" element={<GetAllBookingsbyUser />} />
        <Route path="/GetAllBooking" element={<GetAllBooking />} />
        <Route path="/BookingCancel" element={<BookingCancel />} />
      </Routes>
      {shouldRenderNavBar &&<Footer/>}
    </div>
  );
}

export default App;
