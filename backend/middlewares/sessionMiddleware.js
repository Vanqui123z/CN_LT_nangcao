const session = require('express-session');
const flash = require('connect-flash');

class sessionMiddleware{
    sessionConfig = session({
        secret : "myKey ",
        resave: false,
        saveUninitialized: false, cookie: {
            secure: false, // dùng HTTPS thì để true
            maxAge: 24 * 60 * 60 * 1000 // 1 ngày
          }
    })
    flashMiddleware = (req, res, next) => {
        res.locals.messages = req.flash();
        next();
    };
}
module.exports= new sessionMiddleware;