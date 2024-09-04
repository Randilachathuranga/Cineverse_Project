const mongoose = require('mongoose');

const seatsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schedule_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true},
  seat_id: [Number]
});

module.exports = mongoose.model('Seat', seatsSchema);