const Ajv = require('ajv')
const debug = require('debug')('app:controllers:auth')

const { User } = require('../models')
const loginReqSchema = require('../schemas/requests/login.json')
const registerReqSchema = require('../schemas/requests/register.json')

const ajv = new Ajv({ allErrors: true })

const auth = async (req, res, next) => {
  try {
    const valid = ajv.validate(loginReqSchema, req.body)

    if (!valid) return res.status(400).json(ajv.errors)

    const { login, password } = req.body
    const user = await User.findOne({ login }).exec()

    if (user && user.validatePassword(password)) {
      res.json({ jwt: user.getJWT() })
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
}

const register = async (req, res, next) => {
  try {
    const valid = ajv.validate(registerReqSchema, req.body)

    if (!valid) return res.status(400).json(ajv.errors)

    const { login, password, confirmation } = req.body

    if (await User.findOne({ login })) {
      return res.sendStatus(409)
    }

    if (password !== confirmation) {
      return res.sendStatus(403)
    }

    const newUser = new User({ login })

    newUser.setPassword(password)
    await newUser.save()

    res.status(201).json({ token: newUser.getJWT() })
  } catch (err) {
    next(err)
  }
}

exports.authController = {
  auth,
  register,
}
