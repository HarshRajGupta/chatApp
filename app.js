const port = process.env.PORT || 3000;

const io = require('socket.io')(port);
console.log(`Listening at port ${port}`);
const users = {};

io.on('connection', socket => {
    socket.on('new-User-Joined', name => {
        console.log(`${name} joined the chat`);
        users[socket.id] = name;
        socket.broadcast.emit('user-Joined', name);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, sender: users[socket.id]});
    });

})