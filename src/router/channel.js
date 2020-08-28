const express = require('express'); 
const router = express.Router();
const {isAuthenticated} = require('./../passport');
const Channel = require('../model/Channel.js')
const path = require('path')

router.post("/create", isAuthenticated(), (req, res) => {
  const channel = new Channel({title:'제목', category:'분위기', thumbnail:'/ghn.png'}, req.user);

  res.redirect(`/channel/${channel.id}`);
});

router.get("/:channelId", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/channel.html"));
});

module.exports = router;