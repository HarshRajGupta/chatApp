const socket = io();

const form = document.getElementById("send-container");
const messageInput = document.getElementById("sentMessage");
const messageContainer = document.querySelector(".cotainer");

function append(message, status) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = message;
    messageElement.classList.add("message");
    messageElement.classList.add(status);
    messageContainer.appendChild(messageElement);
}

let name = prompt("Enter your name join");
while (name === null) {
    name = prompt("Enter your name join");
}
if (name != null) {
    console.log(`${name}: welcome to the chat`);
    socket.emit("new-User-Joined", name);
    append(`😋 You joined the chat 😋`, "joined");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}`, "sent");
    if (name != null) {
        socket.emit("send", message);
    }
    messageInput.value = "";
});

socket.on("user-Joined", (user) => {
    console.log(`${user} joined the chat`);
    append(`${user} joined the chat`, "joined");
});

socket.on("receive", (data) => {
    console.log(`${data.sender}: ${data.message}`);
    append(`${data.sender}: ${data.message}`, "receive");
});
socket.on("left", (name) => {
    console.log(`${name}: left the chat`);
    append(`${name} left the chat`, "left");
});