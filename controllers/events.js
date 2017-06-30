const Event = require('../models/event');

function indexRoute(req, res, next) {
  Event
    .find()
    .exec()
    .then((events) => res.json(events))
    .catch(next);
}

function searchRoute(req, res, next) {
  console.log('hello', req.query.longitude);
  // var limit = req.query.limit || 2;
  // var maxDistance = req.query.distance || 100;
  // maxDistance /= 6371;
  // var coords = []; // get coordinates [ <longitude> , <latitude> ]
  // coords[0] = req.query.longitude;
  // coords[1] = req.query.latitude;

  // find a location

  // Event
  // .find({
  //   loc: {
  //     $near: {
  //       type: 'Point', coordinates:[-179.0, 0.0]
  //     }
  //   }
  // }, function (err, docs) {

//   Event
//   .find({ 'loc': { $near: { type: 'Point',  coordinates: [ 0, 0 ] }}})
//   .exec()
//   .then((events)=> {
//     if(events) return res.status(200).json({results: events});
//   })
// .catch(next);


  Event
  .find({ loc: { '$near': {
    '$maxDistance': 1,
    '$geometry': { type: 'Point', coordinates: [ 0, 0 ] } } }
  })
  .then((events)=> {
    if(events) return res.status(200).json({results: events});
  })
  .catch(next);
}

//   Event
//     .find({
//       loc: {
//         $near: coords,
//         $maxDistance: maxDistance
//       }
//     })
//     .limit(1) //limit
//     .exec()
//     .then((events)=> {
//       if(events) return res.status(200).json({results: events});
//     })
//   .catch(next);
// }

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
  search: searchRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
