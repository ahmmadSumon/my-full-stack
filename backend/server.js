const express = require('express')
connectDB = require('./config/db')
const app =express()
const PORT = process.env.PORT || 5000
const dotenv = require('dotenv')

app.use(express.json())
dotenv.config()
connectDB()


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))