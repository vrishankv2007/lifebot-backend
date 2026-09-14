const io = require('socket.io-client');
// Connecting to our own server
const socket = io(' https://lifebot-backend-u26q.onrender.com'); 

// Starting coordinates (Bengaluru)
let currentLat = 12.9716;
let currentLng = 77.5946;

console.log("🛸 Drone Hardware Simulator Powered On...");

// Every 1 second, move the drone and send the data
setInterval(() => {
  // Move slightly North-East
  currentLat += 0.0002;
  currentLng += 0.0002;

  const telemetryData = {
    lat: currentLat,
    lng: currentLng,
    alt: 45, // 45 meters high
    speed: 12, // 12 m/s
    battery: 95 
  };

  // Broadcast to the server
  socket.emit('telemetry_update', telemetryData);
  console.log("Sent coordinates:", currentLat.toFixed(4), currentLng.toFixed(4));
}, 1000);