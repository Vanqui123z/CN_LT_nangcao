const jwt = require("jsonwebtoken");
const passport = require("passport");

class PassportController {
  githubLogin() {
    return passport.authenticate("github", { scope: ["user:email"] });
  }

  githubCallback(req, res, next) {
    passport.authenticate("github", { failureRedirect: "/login" }, (err, user) => {
      if (err || !user) return res.redirect("/login");

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_IN }
      );

      res.cookie("token", token, { httpOnly: true });
      return res.redirect("/home");
    })(req, res, next);
  }

  googleLogin() {
    return passport.authenticate("google", { scope: ["profile", "email"] });
  }

  googleCallback(req, res, next) {
    passport.authenticate("google", { failureRedirect: "/login" }, (err, user) => {
      if (err || !user) return res.redirect("/login");

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_IN }
      );

      res.cookie("token", token, { httpOnly: true });
      return res.redirect("/home");
    })(req, res, next);
  }
}

module.exports = new PassportController();
