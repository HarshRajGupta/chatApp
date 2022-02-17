const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendfile(`${__dirname}/chatPage.html`);
});

const users = {};

io.on('connection', socket => {
    socket.on('new-User-Joined', name => {
        console.log(`${name} joined the chat`);
        users[socket.id] = name;
        socket.broadcast.emit('user-Joined', name);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, sender: users[socket.id] });
    });
    socket.on('disconnect', message => {
        if (users[socket.id] != null) {
            socket.broadcast.emit('left', users[socket.id]);
        }
        delete users[socket.id];
    })

})

const port = process.env.PORT || 2202;
http.listen(port, function () {
    console.log(`listening on ${port}`);
});