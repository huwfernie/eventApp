const mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  name: String,
  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
  }
});

module.exports = mongoose.model('Location', LocationSchema);
