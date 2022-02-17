const socket = io();

const form = document.getElementById('send-container');
const messageInput = document.getElementById('sentMessage');
const messageContainer = document.querySelector('.cotainer');

function append(message, status) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(status);
    messageContainer.appendChild(messageElement);
}

const name = prompt("Enter your name join");
console.log(`${name}: welcome to the chat`)
socket.emit('new-User-Joined', name);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}`, 'sent');
    socket.emit('send', message);
    messageInput.value = "";
})


socket.on('user-Joined', user => {
    console.log(`${user} joined the chat`);
    append(`${user} joined the chat`, 'receive');
})

socket.on('receive', data => {
    console.log(`${data.sender}: ${data.message}`);
    append(`${data.sender}: ${data.message}`, 'receive');
})