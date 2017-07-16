const jwt = require('jwt-simple');

const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res) {
  // user has already has email and password auth'd
  // just need to provide a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  // see if user with given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if a user exists, return an error
    const user = new User({
      email: email,
      password: password
    });

    // if user with email does not exist, create and save user record
    user.save(err => {
      if (err) { return next(err); }

      // respond to request indicating user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
