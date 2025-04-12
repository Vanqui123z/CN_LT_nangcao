const GitHubStrategy = require('passport-github2').Strategy;
const Users = require("../../models/userModel");


module.exports = (passport) => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback'
  },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile._json.name)
      try {
        let user = await Users.findOne({ githudId: profile._json.id });
        console.log(user)
        if (!user) {
          user = new Users({
            name: profile._json.name,
            age: 34,
            email: profile._json.email|| "",
            password: 123456,
            googleId: null,
            githudId: profile._json.id

          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }

    }));
};
