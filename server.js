const { createServer } = require('http');
const { Server } = require('socket.io');
const uuid = require('uuid').v4;

const httpServer = createServer();
const io = new Server(httpServer, {
  /* options */
});

io.engine.generateId = (req) => {
  return uuid(); // must be unique across all Socket.IO servers
};

io.on('connection', (socket) => {
  socket.join('room1');
  console.log(
    `A new client id registered: ${socket.id} at room : ${[
      ...socket.rooms.values(),
    ].join(',')}`
  );
});

let id = 0;
setInterval(() => {
  id++;

  io.fetchSockets().then((sockets) => {
    for (const socket of sockets) {
      socket.emit('data', { id, name: 'Hello from the server..!' });
    }
  });
}, 6000);

httpServer.listen(3030, () => {
  console.log(`Started..!`);
});
