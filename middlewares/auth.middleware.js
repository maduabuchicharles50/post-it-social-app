
const moment = require('moment');
const jwt = require('jwt-simple');
const User = require('../models/user.model');

// 2. Authentication Middleware

async function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'TokenMissing' });
  }
  var token = await req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, process.env.SECRET);
  }
  catch (err) {
    return res.status(401).send({ error: "TokenInvalid" });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ error: 'TokenExpired' });
  }
  // check if the user exists
  await User.findById(payload.sub, function(err, user){
    if (!user){
      return res.status(401).send({error: 'PersonNotFound'});
    } else {
      req.user = payload.sub;
      next();
    }
  });
};

module.exports = ensureAuthenticated