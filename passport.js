
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


passport.use(new GoogleStrategy({
    clientID: '570722112717-6lehllavr24nci5s09loisg0m4vevhis.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done){
    done(null, user);

})

passport.deserializeUser(function(user, done){
    done(null, user);
})