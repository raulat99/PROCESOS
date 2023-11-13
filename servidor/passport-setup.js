const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleOneTapStrategy = require("passport-google-one-tap").GoogleOneTapStrategy;


passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      //prod
      clientID: "277970597970-rls3ih375na1atcscg2ueesj8ufk4ooe.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://arquitectura-base-procesos-s5ehr653dq-ew.a.run.app//google/callback",

      //local
      //clientID: "277970597970-l68mbl6i3peleg3qus1i7p5o0h4b5b53.apps.googleusercontent.com",
      //clientSecret: "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",
      //callbackURL: "http://localhost:3000/google/callback",

    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.use(
  new GoogleOneTapStrategy(
    {
      //prod
      clientID: "277970597970-3k4dolmp24icn4hel7hib86guhhbj9r1.apps.googleusercontent.com",
      clientSecret: "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",

      //local
      //clientID: "277970597970-43lh2h0c4n9c7i38ebkk07qdftv3mhhc.apps.googleusercontent.com",
      //clientSecret: "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",
      verifyCsrfToken: false
    },
    function (profile, done) {
      return done(null, profile);
    }
  )
);