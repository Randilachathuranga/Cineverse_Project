import React from "react";
import './Features.css';

export default function Features(){
  return(
    <div className="features-container">
      <h2 className="features-title">Features</h2>
      <div className="features">
        <ul className="features-ul">
          <li className="feature-li">
            <div className="feature">
              <img className="item" src="icons/booking.png" alt="booking"/>
              <h3 className="item-title">Intuitive Booking System</h3>
            </div>
          </li>
          <li className="feature-li">
            <div className="feature">
              <img className="item" src="icons/camera.png" alt="films"/>
              <h3 className="item-title">Film Discovery</h3>
            </div>
          </li>
          <li className="feature-li">
            <div className="feature">
              <img className="item" src="icons/group.png" alt="users"/>
              <h3 className="item-title">User Profiles</h3>
            </div>
          </li>
          <li className="feature-li">
            <div className="feature">
              <img className="item" src="icons/credit-card.png" alt="card"/>
              <h3 className="item-title">Secure Payment System</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
