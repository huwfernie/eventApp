const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User
  .create(req.body)
  .then(() => res.json({ message: 'Registration Successful'}))
  .catch(next);
}

function login(req, res, next) {
  User
  .findOne({email: req.body.email})
  .then((user) => {
    if(!user || !user.validatePassword(req.body.password)) return res.unauthorized();
    // generate JWT token and then send it to the client.
    //const token = jwt.sign({ PAYLOAD }, SECRET,  EXPIREY);
    const token = jwt.sign({ userId: user.id}, secret, { expiresIn: '1hr'} );
    // now send it -->
    res.json({ token, message: `welcome back ${user.username}`});
  })
  .catch(next);
}

module.exports = {
  register,
  login
};
