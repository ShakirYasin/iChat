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
app.use('/api/message',  require('./routes/messageRoutes'))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold))

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://127.0.0.1:5173"
    }
})

io.on("connection", (socket) => {
    console.log("Connected to the socket...");

    socket.on("setup", (userData) => {
        socket.join(userData?._id);
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined Room" + room);
    })

    socket.on("typing", (room) => {
        socket.in(room).emit("typing", room)
    })
    
    socket.on("stop typing", (room) => {
        socket.in(room).emit("stop typing")
    })

    socket.on("new message", (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;
        if(!chat.users) return console.log("chat.users is not defined")
        
        chat.users.forEach((user) => {
            if(user?._id === newMessageRecieved.sender._id) return
            
            socket.in(user?._id).emit("message recieved", newMessageRecieved)
        })
    })

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData?._id)
    })
})