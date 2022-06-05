import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const PORT = process.env.PORT || 3001;
const WEBAPP_PATH = "../webapp/build";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, WEBAPP_PATH)));

app.get("/api", (_, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, WEBAPP_PATH, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
