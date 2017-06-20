const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  location: {
    name: { type: String, required: true },
    lat: { type: String, required: true },
    lon: { type: String, required: true }
  },
  website: { type: String, required: false },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
