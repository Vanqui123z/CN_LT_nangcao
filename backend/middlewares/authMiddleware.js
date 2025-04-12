const jwt = require("jsonwebtoken");
const authMiddleware = (req,res,next)=>{
    const token = req.cookies?.token;
    console.log("token", token)
    if(token){
        try {
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            req.user = decode;
            next();
        }catch(err){
            console.log("token khong hop le hoac het han")
        }
    }
    if( req.session && req.user){
        return next();
    }

    console.log(" Khong co token va session ! redirecting to login")
    return res.redirect("/auth/login")
  

}
module.exports= authMiddleware;