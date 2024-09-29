const express = require("express");
const path = require("path");
const socket = require("socket.io");
const app = express();

const server = app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
const io = socket(server);
const messages = [];
const user = [];

io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);

  socket.on("join", (userName) => {
    user.push({ name: userName, id: socket.id });
    console.log("User " + userName + " with id " + socket.id + " has joined.");
    console.log("Current users", user);
    socket.broadcast.emit("newUser", userName);
  });

  socket.on("message", (message) => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Oh, socket " + socket.id + " has left");
    const index = user.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      const userName = user[index].name;
      console.log("User " + userName + " with id " + socket.id + " has left");
      user.splice(index, 1);
      console.log("Current users:", user);
      socket.broadcast.emit("userLeft", userName);
    }
  });

  console.log("I've added a listener on message and disconnect events \n");
});

app.use(express.static(path.join(__dirname, "/client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});