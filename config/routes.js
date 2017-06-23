const router = require('express').Router();
const events = require('../controllers/events');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');

router.route('/events')
// .all(secureRoute)
  .get(events.index)
  .post(imageUpload, events.create);

router.route('/events/:id')
.all(secureRoute)
  .get(events.show)
  .put(imageUpload, events.update)
  .delete(events.delete);

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
