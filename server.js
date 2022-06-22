const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, getUsers} = require('./utils/users')


const app = express();
const server = http.createServer(app)
const io = socketio(server);

// Set static folder

app.use(express.static(path.join(__dirname, 'public')))
const botName = 'DOCTOR'
// Run when a client connects 

io.on('connection', socket => {
    socket.on('joinChat', ({username}) =>{
      const user = userJoin(socket.id ,username);  
       // emit to the newly connected patient
    socket.emit("message",formatMessage(botName,"Welcome to DOCTORNA" ));

    // broadcast to all except the 
    socket.broadcast.emit("message",formatMessage(botName,`${user.username} has joined the chat `));

    io.emit('users', {
        users:getUsers(user.username)
    });

    })

    console.log('New websocket connection')

    

    
    //Runs When a client disconnects
    socket.on('disconnect',()=> {
        io.emit("message",formatMessage(botName," a patient has left the chat "));
    });

    //listen for chat message

    socket.on('chatMessage',msg=>{
        const user = getCurrentUser(socket.id)
        io.emit('message', formatMessage(user.username, msg))
    })

   
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
