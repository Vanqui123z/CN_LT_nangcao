const passport = require('passport');
const Users = require('../models/userModel');
const strategiesGg = require('./strategiesLogin/google');
const strategiesGit = require('./strategiesLogin/github');


strategiesGg(passport);
strategiesGit(passport);


// Lưu user vào session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Lấy user từ session
passport.deserializeUser(async (_id, done) => {
    try {
        const user = await Users.findById(_id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
