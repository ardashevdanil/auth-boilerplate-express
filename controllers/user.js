const { User } = require('../models')
const debug = require('debug')('app:conrollers:user')

const get = async (req, res, next) => {
  try {
    const user = await User.getById(req.user._id)

    res.json(user)
  } catch (err) {
    next(err)
  }
}

exports.userController = {
  get,
}
