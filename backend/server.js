const express = require('express')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoute')
const authRoutes = require('./routes/authRoute')
const notFound = require('./middleware/notFound')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')
const app =express()
const PORT = process.env.PORT || 5000
const dotenv = require('dotenv')

dotenv.config()
connectDB()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json())
//routes
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

//error handlers
app.use(notFound)
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))