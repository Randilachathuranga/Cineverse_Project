require('dotenv').config(); 
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

// Function to send email with QR code
async function sendTicketEmail(to, bookingDetails) {
  try {
    // Generate QR Code for the booking details
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(bookingDetails));

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Your Movie Ticket',
      text: 'Thank you for your purchase! Here is your ticket.',
      attachments: [
        {
          filename: 'ticket.png',
          content: qrCodeDataURL.split('base64,')[1], 
          encoding: 'base64',
        },
      ],
    };

    // Create transporter and send the email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendTicketEmail };
