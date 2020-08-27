const express = require('express');
const app = express();
const server = require("http").createServer(app);
const {connectSocket} = require("./src/socket.js");

connectSocket(server);

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html')
})

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`listening ${PORT} port`);
})