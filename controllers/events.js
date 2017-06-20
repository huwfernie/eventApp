const Event = require('../models/event');

function indexRoute(req, res, next) {
  Event
    .find()
    .exec()
    .then((events) => res.json(events))
    .catch(next);
}

function createRoute(req, res, next) {
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
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
