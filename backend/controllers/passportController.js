// controllers/passportController.js
const passport = require("passport");

class PassportController {
  githubLogin() {
    return passport.authenticate("github", {
      scope: ["user: email"]
    });
  }

  githubCallback() {
    return passport.authenticate("github", {
      failureRedirect: "/login",
      successRedirect: "/event"
    });
  }

  googleLogin() {
    return passport.authenticate("google", {
      scope: ["profile", "email"]
    });
  }

  googleCallback() {
    return passport.authenticate("google", {
      failureRedirect: "/login",
      successRedirect: "/event"
    });
  }
}

module.exports = new PassportController();
