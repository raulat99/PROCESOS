const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GoogleOneTapStrategy = require('passport-google-one-tap').GoogleOneTapStrategy

passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: '277970597970-43lh2h0c4n9c7i38ebkk07qdftv3mhhc.apps.googleusercontent.com',
      clientSecret: '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',

      // clientID: require('./gestorVariables.js').obtenerClientIdGoogle(),
      // clientSecret: require('./gestorVariables.js').obtenerClientSecretGoogle(),
      // prod
      // callbackURL: "https://arquitectura-base-procesos-s5ehr653dq-ew.a.run.app/google/callback",
      // local
      callbackURL: 'http://localhost:3000/google/callback'

    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile)
    }
  )
)

passport.use(
  new GoogleOneTapStrategy(
    {
      clientID: '277970597970-43lh2h0c4n9c7i38ebkk07qdftv3mhhc.apps.googleusercontent.com',
      clientSecret: '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',

      // clientID: require('./servidor/gestorVariables.js').obtenerClientIdGoogle(),
      // clientSecret: require('./servidor/gestorVariables.js').obtenerClientSecretGoogle(),
      verifyCsrfToken: false
    },
    function (profile, done) {
      return done(null, profile)
    }
  )
)
