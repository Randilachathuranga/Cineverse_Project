import React from "react";
import './Hero.css';

export default function Hero(){
  return(
    <>
      <div className="hero-container">
        <h1 className="hero-title">Cineverse</h1>
        <p className="hero-intro">Cineverse is an innovative movie ticket booking platform designed to bring the magic of cinema right to your fingertips. With a sleek, modern interface and user-friendly features.</p>
        <button className="cta">Book Now</button>
      </div>
    </>
  );
}