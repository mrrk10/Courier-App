const express = require('express')
const cors = require('cors')
const dbConnect = require('./connection/dbConnect')
const userRoute = require('./routes/user')
const ridesRoute = require('./routes/rides')

const app = express()

const socketio = require("socket.io");

// Create the http server
const server = require('http').createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*"
  }
});
require('dotenv').config()
const port = process.env.PORT 
dbConnect()
app.use(express.json({limit:'50mb'}))

app.use(cors())
app.use('/',userRoute)
app.use('/',ridesRoute)

io.on("connection", (socket) => {
  socket.on("messageRequest", (message)=>{
   
    io.emit('messageRequest', message)
  })
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
