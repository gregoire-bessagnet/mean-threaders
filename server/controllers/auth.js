'use strict';

let User = require('../models/user');

class AuthController {

  constructor() {}

  // Authenticate user using our "LocalStrategy" in passport.js
  local(req, res, next, passport) {

    // Second parameter is our own callback so that we can manage error messages the way we want
    return passport.authenticate('local', (err, user, info) => {
      if (err) {
        next(err);
      } else if (!user) {
        res.status(401).json(info);
      } else {
        res.json({
          token: user.generateJWT()
        });
      }
    })(req, res, next);
  }

  // Authenticate user using our "FacebookStrategy" in passport.js
  facebook(passport) {
    return passport.authenticate('facebook');
  }

  // Terminate a Facebook authentication
  authenticate(req, res, next) {
    if (req.user) {
      // Build a fake user for generating the auth token
      let user = new User(req.user);
      let token = user.generateJWT();
      // Redirect to the client view
      res.redirect("/#!/auth/callback/" + token);
    } else {
      res.send(401);
    }
  }
}

module.exports = AuthController;