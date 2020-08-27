const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {getAllUsers} = require('./model/User/resolver.js');

passport.use(
  new LocalStrategy({ session: true }, (username, password, done) => {
    try {
      // 데이터베이스에서 일치하는 사용자를 찾는다
      const user = getAllUsers().filter(u => u.identify(username, password))[0]

      // 콜백함수로 결과를 전달한다. 사용자가 없으면 false를 전달
      done(null, user ? user : false)
    } catch (err) {
      // 예외가 발생하면 콜백함수에 오류를 전달한다
      done(err)
    }
  })
)

module.exports = {
  initPassport: (app) => {
    app.use(passport.initialize());

    app.use(passport.session());
  }
}