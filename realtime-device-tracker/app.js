import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 8531;

import { Server } from "socket.io";
const httpserver = http.createServer(app);
const io = new Server(httpserver);

app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

httpserver.listen(8531, () => console.log(`Server is running in ${PORT}`));
