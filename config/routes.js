const router = require('express').Router();
const events = require('../controllers/events');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');


router.route('/events')
.all(secureRoute)
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



router.all('/*', (req, res) => res.notFound());

module.exports = router;
