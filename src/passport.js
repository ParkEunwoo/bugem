const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {getUser, findUser} = require('./model/User/resolver.js');

module.exports = {
  initPassport: () => {
    passport.serializeUser((user, cb) => {
      cb(null, user._id)
    })
    
    passport.deserializeUser(async (id, cb) => {
      const user = await getUser(id);
      cb(null, user)
    })

    passport.use(
      new LocalStrategy({session: true }, async (userId, userPw, done) => {
        try {
          const user = await findUser({userId, userPw});
    
          done(null, user ? user : false)
        } catch (err) {
          done(err)
        }
      })
    )
    
    return passport;
  },
  isAuthenticated: () => (req, res, next) => {
    if(!req.user) {
      return res.sendStatus(403);
    }

    next();
  }
}