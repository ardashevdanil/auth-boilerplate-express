const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { User } = require('../models')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new Strategy(options, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id)

    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (err) {
    return done(err, false)
  }
}))

exports.passport = passport
