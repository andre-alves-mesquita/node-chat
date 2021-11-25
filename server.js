const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));

app.get("/", function (req, res) {
  res.render("index.html");
});
let messages = [];

app.post("/api/resposta", function (req, res) {
  console.log(req.body);

  io.sockets.emit("wppMessage", req.body);

  res.status(200).json(req.query);
});

app.post("/api/sendMessage", function (req, res) {
  console.log(req.body);

  res.sendFile(__dirname + "/html/roteamento.php");

  res.status(200).json(req.body);
});

// server-side
io.on("connection", (socket) => {
  console.log(`Socket contectado: ${socket.id}`);

  socket.emit("previousMessages", messages);

  socket.on("sendMessage", (data) => {
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });
});

httpServer.listen(3000);
