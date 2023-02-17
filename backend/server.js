const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const {notFound, errorHandler} = require('../backend/middleware/errorMiddleware')
const cors = require('cors');

dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.use(cors({
    origin: '*',
    // credentials: true,
}))

app.get('/', (req, res) => {
    res.send('API is running successfully')
})

app.use('/api/user',  require('./routes/userRoute'))
app.use('/api/chat',  require('./routes/chatRoute'))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold))