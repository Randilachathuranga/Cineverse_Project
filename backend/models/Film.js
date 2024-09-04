const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }, 
  genre: [String],
  duration: { type: Number, required: true }, 
  release_date: { type: Date },
  rating: { type: String },
  image:{type:String, required:true},
});

module.exports = mongoose.model('Film', filmSchema);
