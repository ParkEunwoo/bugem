const express = require('express'); 
const router = express.Router();
const {passport} = require('./../passport');
const {createUser} = require('./../model/User/resolver')
const path = require('path')

router.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/login.html'));
})
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.send('로그인 성공')
})

router.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/register.html'));
})
router.post('/register', (req, res) => {
  const user = {
    name: req.body.name,
    userId: req.body.username,
    userPw: req.body.password,
  }
  createUser(user);
  res.send('회원가입 완료')
})

module.exports = router;