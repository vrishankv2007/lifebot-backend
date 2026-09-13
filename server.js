const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(require('cors')()); 
const server = http.createServer(app);

// This is our radio tower. It listens for the drone.
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
  console.log('✅ Something connected to the server!');

  // When the drone sends data, pass it to the dashboard
  socket.on('telemetry_update', (data) => {
    socket.broadcast.emit('telemetry_update', data);
  });
});

// Turn the server on
server.listen(5000, () => {
  console.log("🚀 Drone server is LIVE on port 5000!");
});