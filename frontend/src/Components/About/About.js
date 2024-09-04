import React from 'react';
import './About.css';

function About() {
  return (
    <div className='about-container'>
      <div className='header'>
        <h1 className='header-h1'>About Us - Cineverse</h1>
      </div>
      <div className='about sub-section'>
        <h3 className='sub-title'>Welcome to Cineverse</h3>
        <img className='about-img' src='img/img1.jpg' alt='main-img'/>
        <p className='sub-intro'>At Cineverse, we believe that the magic of cinema should be accessible to everyone, anywhere, at any time. Our mission is to bring the excitement of the big screen to your fingertips, making it easier than ever to discover and book tickets for the latest movies.</p>
      </div>
      <div className='we-are sub-section'>
        <h3 className='sub-title'>What We Do?</h3>
        <img className='about-img' src='img/img2.jpg' alt='we-are'/>
        <ul className='sub-ul'>
          <li><b>Browse and Book</b>: Explore the latest movie releases, view showtimes, and book your tickets in just a few clicks.</li>
          <li><b>Personalized Experience</b>: Receive tailored movie recommendations based on your viewing preferences and past bookings.</li>
          <li><b>Exclusive Offers</b>: Enjoy special discounts, promotions, and loyalty rewards available only to Cineverse members.</li>
        </ul>
      </div>
      <div className='why sub-section'>
        <h3 className='sub-title'>Why Choose Cineverse?</h3>
        <img className='about-img' src='img/img3.jpg' alt='we-are'/>
        <ul className='sub-ul'>
          <li><b>User-Friendly Platform</b>: Our intuitive interface makes it easy for you to find what you're looking for, whether it's the newest blockbuster or a timeless classic.</li>
          <li><b>Wide Selection</b>: From the latest Hollywood hits to indie films and local productions, we offer a diverse selection of movies to suit all tastes.</li>
          <li><b>Seamless Booking</b>: Book your tickets quickly and securely, with multiple payment options to choose from.</li>
          <li><b>Customer Support</b>: Our friendly and knowledgeable support team is always here to assist you with any questions or issues.</li>
        </ul>
      </div>
      <div className='end sub-section'>
        <h3 className='sub-title'>Thank You for Choosing Cineverse</h3>
        <p className='sub-intro'>
        We’re thrilled to be part of your movie-going journey and look forward to bringing you more unforgettable moments on the big screen.
        </p>
      </div>
    </div>
  );
}

export default About;