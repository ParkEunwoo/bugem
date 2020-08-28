const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({ 
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.user.name}.${file.mimetype.split('/').pop()}`)
  }
});
const upload = multer({storage})

const router = express.Router();

const {isAuthenticated} = require('./../passport');
const {createChannel, recommandList, findChannel, categoryList} = require('../model/channelList');
const path = require('path')

router.get('/create', isAuthenticated(), (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/createChannel.html'));
})
router.post("/create", isAuthenticated(), upload.single('thumbnail'), (req, res) => {
  const {title, category} = req.body;
  const {user} = req;
  const id = createChannel({title, category, user});

  res.redirect(`/channel/join/${id}`);
});

router.get("/join/:channelId", isAuthenticated(), (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/channel.html"));
});

router.get('/recommand-list', (req, res) => {
  res.json(recommandList())
})
router.get('/search/:keyword', (req, res) => {
  res.json(findChannel(req.params.keyword))
})
router.get('/category/:category', (req, res) => {
  res.json(categoryList(req.params.category));
})

module.exports = router;