const User = require('../models/user')
const jwt = require('jsonwebtoken')

//generate token
const generateToken = (user) => {
    return jwt.sign({id: user._id, role: user.role},process.env.JWT_SECRET, {expiresIn: '1d'})
}

//register user
const registerUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body
        const user = await User.create({name, email, password, role})
        const token = generateToken(user)
        res.status(200).json({user, token})
    } catch (error) {
      res.status(400).json({error: error.message})        
    }
}


//login user
const loginUser = async (req, res) => {
    try {
        const {email, password}= req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "Invalid email or password"})
        }
       const isMatch = await user.matchPassword(password)
       if(!isMatch){
        return res.status(400).json({error: "Invalid email or password"})
       }
       const token = generateToken(user)
       res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message})        
    }
}

module.exports = {registerUser, loginUser}