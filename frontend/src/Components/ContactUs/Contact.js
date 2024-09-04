import './Contact.css';

import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import React, { useState } from 'react';

function Contact() {
  const [result, setResult] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending...');

    const formData = new FormData(event.target);
    formData.append('access_key', '85facdbb-3963-4333-8298-684173311952');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        console.log('Success', data);
        setResult(data.message);
        event.target.reset();
      } else {
        console.log('Error', data);
        setResult('Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form', error);
      setResult('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='contact-container'>
      {/* Content Overlay */}
      <div className='content-overlay'>
        <div className='container'>
          <h1 className='contact-title'>CONTACT US</h1>
          <h2 className='contact-subtitle'>Get in Touch</h2>
          <div className='contact-content'>
            {/* Left Column - Contact Information */}
            <div className='contact-info'>
              <h3 className='info-title'>Send us a message</h3>
              <p className='info-text'>
                Feel free to reach out through the contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service to our community.
              </p>
              <div className='info-item'>
                <FiMail className='info-icon' />
                <p>Contact@Cineverse.mov</p>
              </div>
              <div className='info-item'>
                <FiPhone className='info-icon' />
                <p>+9470-701-7043</p>
              </div>
              <div className='info-item'>
                <FiMapPin className='info-icon' />
                <p>77 Reid Ave, Colombo 07, CO 02139, Sri Lanka.</p>
              </div>
            </div>
            {/* Right Column - Contact Form */}
            <div className='contact-form'>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label>Your name</label>
                  <input
                    type='text'
                    name='name'
                    placeholder='Enter your name'
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Phone Number</label>
                  <input
                    type='tel'
                    name='phone'
                    placeholder='Enter your mobile number'
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Write your message here</label>
                  <textarea
                    name='message'
                    rows='4'
                    placeholder='Enter your message'
                    required
                  ></textarea>
                </div>
                <button type='submit' className='submit-button'>
                  Submit now <span className='arrow'>→</span>
                </button>
              </form>
              <span className='form-result'>{result}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;