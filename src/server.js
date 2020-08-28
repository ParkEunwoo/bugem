const express = require('express');
const app = express();
const server = require("http").createServer(app);
const session = require('express-session');
const path = require('path');
const {v4:uuidV4} = require('uuid');

const {connectSocket} = require('./socket.js');
const {initPassport} = require('./passport.js');
const db = require('./db.js');

const PORT = 3000;

module.exports = {
  createServer: () => {
    app.use(express.static("public"));
    app.use(session({
      name: 'bugem-session',
      secret: 'bugembugem',
      resave: true,
      saveUninitialized: true,
    }))
    app.use(express.urlencoded({ extended: true }))
    connectSocket(server);

    const passport = initPassport();

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/auth', require('./router/auth.js'));

    app.get("/debug", (req, res) => {
      res.json({
        "req.session": req.session, // 세션 데이터
        "req.user": req.user, // 유저 데이터(뒷 부분에서 설명)
        "req._passport": req._passport, // 패스포트 데이터(뒷 부분에서 설명)
      })
    })

    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../public/index.html'));
    })

    app.post("/createRoom", (req, res) => {
      const roomId = uuidV4();

      res.redirect(`/${roomId}`);
    });

    app.get("/:roomId", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/room.html"));
    });
    
    server.listen(PORT, () => {
      console.log(`listening ${PORT} port`);
    })
    
  }
}