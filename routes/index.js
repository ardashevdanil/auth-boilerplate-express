const express = require('express')
const { passport } = require('../middlewares/passport')
const { authRouter } = require('./auth')
const { userRouter } = require('./user')

const router = express.Router()

router.use('/auth', authRouter)
router.use(passport.authenticate('jwt', { session: false }))

// Auth required routes
router.use('/user', userRouter)

exports.indexRouter = router
