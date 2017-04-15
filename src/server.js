const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.info("Client connected! :)");
    socket.on('disconnect', () => {
        console.warn('Disconnnected from client! :(');
    });
});

app.use(express.static(publicPath));

server.listen(port, (err) => {
    console.info(`Server is up on http://localhost:${port}`);
});