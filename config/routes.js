const router = require('express').Router();
const events = require('../controllers/events');
const users = require('../controllers/users');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
//const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');

// Events

router.route('/events')
// .all(secureRoute)
  .get(events.index)
  .post(imageUpload, events.create);

router.route('/eventsSearch')
// .all(secureRoute)
  .get(events.searchManual);

router.route('/eventsSearchTime')
// .all(secureRoute)
  .get(events.searchTime);

router.route('/events/:id')
//.all(secureRoute)
  .get(events.show)
  .put(imageUpload, events.update)
  .delete(events.delete);

// Users
router.route('/users')
// .all(secureRoute)
  .get(users.index)
  .post(imageUpload, users.create);

router.route('/users/:id')
//.all(secureRoute)
  .get(users.show)
  .put(imageUpload, users.update)
  .delete(users.delete);


// register, login, oAuth

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/github')
  .post(oauth.github);

//
// router.route('/oauth/facebook')
//   .post(oauth.facebook);
//
// router.route('/oauth/instagram')
//   .post(oauth.instagram);

// catch all - 404
router.all('/*', (req, res) => res.notFound());

module.exports = router;
