const asyncHandler = require('express-async-handler')
//To hash password
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')


// @desc    Register a new user
// @route   /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
   const {name, email, password} = req.body

   // Validation
   if(!name || !email || !password) {
      res.status(400)
      throw new Error('Please include fields')
   }

   // Find if user already exists
   const userExists = await User.findOne({email})

   if(userExists) {
      res.status(400)
      throw new Error('User already exists')
   }

   // Hash password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)

   // Create user
   const user = await User.create({
      name, 
      email,
      password: hashedPassword
   })

   // If useris created
   if(user){
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email
      })
   }

   res.send('Register Route')
})

// @desc    Register a new user
// @route   /api/users
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
   res.send('Login Route')
})

module.exports = {
   registerUser,
   loginUser,
}