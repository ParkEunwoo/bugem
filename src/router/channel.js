const express = require('express'); 
const router = express.Router();
const {isAuthenticated} = require('./../passport');
const Channel = require('../model/Channel.js')
const path = require('path')

router.post("/create", isAuthenticated(), (req, res) => {
  const channel = new Channel({title:'제목', category:'분위기', thumbnail:'/ghn.png'}, req.user);

  res.redirect(`/channel/join/${channel.id}`);
});

router.get("/join/:channelId", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/channel.html"));
});

router.get('/recommand-list', (req, res) => {
  console.log('hi')
  res.json([new Channel({title:'aa', category:'bb', thumbnail:'dd'}), new Channel({title: 'bb'})])
})

module.exports = router;