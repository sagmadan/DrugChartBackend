const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await User.login(username, password)

    // restricting access to only authorized users
    if (user.isAuthorized) {
        // create a token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    }
    res.status(401).json({error: "User is unauthorized"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await User.signup(username, password)

    // restricting access to only authorized users
    if (user.isAuthorized) {
        // create a token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    }
    res.status(401).json({error: "User is unauthorized"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }