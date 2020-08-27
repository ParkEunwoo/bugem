const express = require('express');
const app = express();
const server = require("http").createServer(app);
const db = require('./db.js');

const PORT = 3000;

module.exports = {
  createServer: () => {
    app.use(express.static("public"));

    app.get('/', (req, res) => {
      res.sendFile(__dirname + 'public/index.html')
    })
    
    server.listen(PORT, () => {
      console.log(`listening ${PORT} port`);
    })
    
    return server;
  }
}