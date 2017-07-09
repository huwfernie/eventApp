const Event = require('../models/event');

function indexRoute(req, res, next) {
  Event
    .find()
    .exec()
    .then((events) => res.json(events))
    .catch(next);
}

function searchManualRoute(req, res, next) {
  var limit = req.query.limit || 10;
  limit = parseInt(limit);

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
  Event.find({
    loc: {
      $near: coords,
      $maxDistance: maxDistance
    }
  }).limit(limit).exec(function(err, locations) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(locations);
  })
  .catch(next);
}

function searchTimeRoute(req, res, next) {
  var limit = 10;
  limit = parseInt(limit);

  const startHours = req.query.start.split('').map(Number);
  const startHour = parseInt(((startHours[0]*10)+startHours[1]));
  const startMinutes = parseInt(((startHours[2]*10)+startHours[3]));
  let start = null;
  if( (startHours.length > 4) || (startHour > 24) || (startMinutes > 60) ){
    throw Error('Time out of range');
  } else {
    start = new Date(2003, 2, 1, startHour, startMinutes, 0, 0);
  }

  const finishHours = req.query.finish.split('').map(Number);
  const finishHour = parseInt(((finishHours[0]*10)+finishHours[1]));
  const finishMinutes = parseInt(((finishHours[2]*10)+finishHours[3]));
  let finish = null;
  if( (finishHours.length > 4) || (finishHour > 24) || (finishMinutes > 60) ){
    throw Error('Time out of range');
  } else {
    finish = new Date(2003, 2, 1, finishHour, finishMinutes, 0, 0);
  }

  // find a location
  Event
    .find()
    .and([
      { startTime: { $gte: start } },
      { finishTime: { $lte: finish } }
    ])
    .limit(limit)
    .exec(function(err, locations) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(locations);
    });
}


function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  Event
    .create(req.body)
    .then((event) => res.status(201).json(event))
    .catch(next);
}

function showRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      res.json(event);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      for(const field in req.body) {
        event[field] = req.body[field];
      }

      return event.save();
    })
    .then((event) => res.json(event))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      return event.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  searchManual: searchManualRoute,
  searchTime: searchTimeRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
