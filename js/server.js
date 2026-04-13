const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

const users = new Map();

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  
  socket.on('join', (username) => {
    users.set(socket.id, username);
    socket.broadcast.emit('system', `${username} se unió al chat`);
    io.emit('userCount', users.size);
  });
  
  socket.on('chatMessage', (data) => {
    io.emit('chatMessage', {
      username: data.username,
      message: data.message,
      time: new Date().toLocaleTimeString()
    });
  });
  
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    if (username) {
      socket.broadcast.emit('system', `${username} abandonó el chat`);
      users.delete(socket.id);
      io.emit('userCount', users.size);
    }
  });
});

server.listen(3000, () => {
  console.log('Servidor de chat en http://localhost:3000');
});