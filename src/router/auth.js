const express = require('express'); 
const router = express.Router();
const {passport, isAuthenticated} = require('./../passport');
const {createUser, isExistId, isExistName} = require('./../model/User/resolver')
const path = require('path')

router.get('/session', isAuthenticated(), (req, res) => {
  res.json(req.user.name);
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/');
})
router.post("/logout", (req, res, next) => {
  // 로그아웃
  req.logout()

  res.redirect('/')
})

router.post('/register', (req, res) => {
  const user = {
    name: req.body.name,
    userId: req.body.username,
    userPw: req.body.password,
  }
  createUser(user);
  res.redirect('/')
})

router.get('/check/userid/:userid', async (req, res) => {
  const isExist = await isExistId(req.params.userid);
  res.json(isExist);
})
router.get('/check/name/:name', async (req, res) => {
  const isExist = await isExistName(req.params.name);
  res.json(isExist);
})

module.exports = router;