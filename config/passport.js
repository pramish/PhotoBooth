const JwtStrategy = require('passport-jwt').Strategy; //requiring the passport-jwt library with Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt; //requiring the passport-jwt library with ExtractJwt
const mongoose = require('mongoose');
const User = require('../routes/api/users/users.model'); //requiring the users model

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secretOrKey' //defining the secret for passport
};

// serching the user based on the userID. If the user is found then return that user if not then return false
module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          console.log(err);
        });
    })
  );
};
