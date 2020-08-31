const express = require('express')
const { userController } = require('../controllers/user')

const router = express.Router()

// GET user profile.
router.get('/', userController.get)

exports.userRouter = router
