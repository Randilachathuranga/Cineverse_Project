const express = require('express');
const router = express.Router();
const { sendTicketEmail } = require('../controllers/emailcontroller');
const auth = require('../middleware/authenticate');

router.post('/send-qrcode', auth, async (req, res) => {
  const { userEmail, bookingData } = req.body;

  try {
    await sendTicketEmail(userEmail, bookingData);
    res.status(200).json({ message: 'QR code sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send QR code', error: error.message });
  }
});

module.exports = router;
