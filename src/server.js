const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let clients = [];

io.on('connection', (socket) => {
    console.info("Client connected! :)");
    clients.push(socket);
    socket.on('disconnect', () => {
        console.warn('Disconnnected from client! :(');
        clients = clients.filter(s => s !== socket);
    });

    socket.on('createMessage', (msg) => {
        console.info('Message created', msg);
        msg.CreatedAt = new Date().toDateString();
        clients.forEach(s => s.emit('newMessage', msg));
    });
});

app.use(express.static(publicPath));

server.listen(port, (err) => {
    console.info(`Server is up on http://localhost:${port}`);
});