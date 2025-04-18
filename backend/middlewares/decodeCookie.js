const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Event = require("../models/eventModel");

async function decodeCookie(token) {
   try{
    if (!token) {throw new Error("Token không tồn tại");
    }else{

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {throw new Error("Không tìm thấy user");}

    const eventsList = await Event.find({email: decoded.email }); 
    console.log(decoded)
    return { user, eventsList, decoded };
    }
   }catch (error){
    if (error.name === "JsonWebTokenError") {
        throw new Error("Invalid token");
      }
      throw error; 
    }
}

module.exports = { decodeCookie };
