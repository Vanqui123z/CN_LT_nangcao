
require("dotenv").config({path:"../backend/config/.env"})
// app.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// ⚙️ Cấu hình passport sử dụng GitHub
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile)
  // Bạn có thể lưu user vào DB ở đây nếu muốn
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// 🔐 Route khởi động đăng nhập
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// ✅ Route callback sau khi xác thực
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login-failed' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// 👤 Route hiển thị thông tin user
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/auth/github');
  res.send(`<h1>Hello, ${req.user.username}</h1><a href="/logout">Logout</a>`);
});

// 🔓 Logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// 🔘 Trang chính
app.get('/', (req, res) => {
  res.send('<a href="/auth/github">Login with GitHub</a>');
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
