const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  film_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
  showTime: { type: Date, required: true }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
