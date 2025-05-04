const express = require('express')
const {registerUser, loginUser} = require('../controllers/authController')
const router = express.Router()
const {body, validationResult} = require('express-validator')

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()
}, registerUser)

router.post('/login', loginUser)

module.exports = router
