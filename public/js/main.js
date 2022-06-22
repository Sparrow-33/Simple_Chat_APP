const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const usersList = document.getElementById('users') 

// Get username and Room from URL

const {username} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
})
const socket = io();

//emit the username to the server

socket.emit('joinChat', {username})


socket.on('message', message =>{
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//get all users

socket.on('users',({users}) =>{

    outputUsers(users);

} )

//Message submit

chatForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const msg =e.target.elements.msg.value;

    // emiting a message to server
    socket.emit('chatMessage', msg);

    //Clear front
    e.target.elements.msg.value ="";
    e.target.elements.msg.focus();
})

// Output message to DOM

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML= `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>`

    document.querySelector('.chat-messages').appendChild(div);
}

// users

function outputUsers(users){

    usersList.innerHTML= `
      ${users.map(user => `${user.username}`).join('')}
    `
}

