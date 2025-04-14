const WebSocket = require("ws");

const server = new WebSocket.Server({
  host: "localhost",
  port: 4600,
});

console.log("Server is Ready!");

let clients = [];

function updateOnlineUsers() {
  const onlineCount = clients.length;
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ onlineUsers: onlineCount }));
    }
  });
}

server.on("connection", (socket) => {
  clients.push(socket);
  console.log(`Client#${clients.length} connected!`);
  updateOnlineUsers();

  socket.on("message", (message) => {
    console.log(`Client#${clients.length}: ${message.toString()}`);

    clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on("close", () => {
    clients = clients.filter((client) => client !== socket);
    updateOnlineUsers();
  });
});

process.stdin.on("data", (data) => {
  const message = data.toString().trim();
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send("Server: " + message);
    }
  });
});
