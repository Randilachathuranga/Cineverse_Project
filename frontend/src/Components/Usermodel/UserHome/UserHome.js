import Getallfilms from '../../Filmmodel/FilmsGet/Getallfilms';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../Hero/Hero';
import Features from '../../Features/Features'

export default function UserHome() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      <Hero/>
      <Getallfilms/>
      <Features/>
    </div>
  );
}

const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
