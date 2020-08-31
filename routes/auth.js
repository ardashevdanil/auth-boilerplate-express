const express = require('express')
const { authController } = require('../controllers/auth')

const router = express.Router()

// POST login user.
router.post('/', authController.auth)

// POST register new user.
router.post('/register', authController.register)

exports.authRouter = router
