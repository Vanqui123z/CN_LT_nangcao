const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require("../../models/userModel");


module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async ( accessToken, refreshToken, profile, done) => {
    try {
              let user = await Users.findOne({ email: profile.emails[0].value});
              console.log("user", user)
              if(user){
                
                console.log("user nay da ton tai!");
              }else{
                  user = new Users({
                      name: profile.displayName,
                      age: 34,
                      email: profile.emails[0].value,
                      password: 123456,
                      googleId: profile.id,
                      githudId: null
                  });
                  await user.save();
              }
              
              return done(null, user);
          } catch (err) {
              return done(err, null);
          }
      }));






  //   return done(null, profile);
  // }));
};
