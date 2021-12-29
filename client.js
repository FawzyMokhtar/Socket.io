const { io } = require('socket.io-client');

const socket = io('ws://localhost:3030');

socket.on('connect', () => {
  console.log(`We are now connected to the Socket.io : ${socket.id}`);
});

socket.on('data', (data) => {
  console.log(data);
});
