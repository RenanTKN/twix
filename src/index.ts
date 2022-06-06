const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const PORT = process.env.PORT || 3001;
const WEBAPP_PATH = "../webapp/build";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, WEBAPP_PATH)));

app.get("/api", (_: any, res: any) => {
  res.json({ message: "Hello from server!" });
});

app.get("*", (_: any, res: any) => {
  res.sendFile(path.resolve(__dirname, WEBAPP_PATH, "index.html"));
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("message", (msg: any) => {
    io.emit("message", msg);
  });
  socket.on("user login", (name: string) => {
    io.emit("user login", name);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
