const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");
const http = require("http");
const session = require("express-session");
const path = require("path");

const options = {
  ca: fs.readFileSync("/etc/letsencrypt/live/showyourstory.tk/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/showyourstory.tk/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/showyourstory.tk/cert.pem"),
};

http.createServer(require('redirect-https')(), app).listen(80);
const server = https.createServer(options, app);

const { connectSocket } = require("./socket.js");
const { initPassport } = require("./passport.js");
const db = require("./db.js");

const PORT = 443;

module.exports = {
  createServer: () => {
    app.use(express.static("public"));
    app.use("/thumbnail", express.static("uploads"));
    app.use(
      session({
        name: "bugem-session",
        secret: "bugembugem",
        resave: true,
        saveUninitialized: true,
      })
    );
    app.use(express.urlencoded({ extended: true }));
    connectSocket(server);

    const passport = initPassport();

    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/auth", require("./router/auth.js"));
    app.use("/channel", require("./router/channel"));
    app.get("/debug", (req, res) => {
      res.json({
        "req.session": req.session, // 세션 데이터
        "req.user": req.user, // 유저 데이터(뒷 부분에서 설명)
        "req._passport": req._passport, // 패스포트 데이터(뒷 부분에서 설명)
      });
    });

    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/index.html"));
    });
    server.listen(PORT, () => {
      console.log(`listening ${PORT} port`);
    });
  },
};
