const Location = require('../models/location');


const findLocation = function(req, res, next) {
  console.log('am i running');
  var limit = req.query.limit || 10;

  // get the max distance or set it to 8 kilometers
  var maxDistance = req.query.distance || 8;

  // we need to convert the distance to radians
  // the raduis of Earth is approximately 6371 kilometers
  maxDistance /= 6371;

  // get coordinates [ <longitude> , <latitude> ]
  var coords = [];
  coords[0] = req.query.longitude || 0;
  coords[1] = req.query.latitude || 0;

  // find a location
  Location.find({
    loc: {
      $near: coords,
      $maxDistance: maxDistance
    }
  }).limit(limit).exec(function(err, locations) {
    if (err) {
      return res.json(500, err);
    }

    res.json(200, locations);
  });
};

module.exports = {
  search: findLocation
};
