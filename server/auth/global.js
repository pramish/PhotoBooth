import { urlencoded, json } from 'body-parser';
import moogan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import flash from 'express-flash-messages';
import LocalStrategy from '../utils/passport-auth';

const globalMiddleware = app => {
  //This is used to logging the user only on develoopment environment
  //Have to put the environment values for morgan
  app.use(urlencoded({ extended: false }));
  app.use(json());

  //Express Session

  app.use(
    session({
      secret: 'secret', //secret for session
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false }
    })
  );

  //Using the passport local strategy
  LocalStrategy(passport);
  app.use(passport.initialize());
  app.use(passport.session());
};

export default globalMiddleware;
