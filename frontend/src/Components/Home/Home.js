import GetallfilmsforGuest from "../Filmmodel/FilmsGet/GetallfilmsforGuest";
import React from "react";
import Hero from "../Hero/Hero";
import Features from "../Features/Features";

export default function Home() {
  return (
    <div className="home-container">
      <Hero/>
      <GetallfilmsforGuest />
      <Features/>
    </div>
  );
}
