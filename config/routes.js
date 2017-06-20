const router = require('express').Router();
const events = require('../controllers/events');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/events')
.all(secureRoute)
  .get(events.index)
  .post(events.create);

router.route('/events/:id')
.all(secureRoute)
  .get(events.show)
  .put(events.update)
  .delete(events.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);



router.all('/*', (req, res) => res.notFound());

module.exports = router;
