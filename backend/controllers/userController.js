const User = require("../models/userModel")

class userController  {
  
    async getUser(req, res){
        try{
            const users = await User.find();
            res.render("views/pages/user", {title: "User Page" , users });
        }catch(error){
            res.status(500).json({ message: "Lỗi khi lấy danh sách user", error });
        }
    }
    createUser(req,res){
     res.json("tao user")
    }
    editUser(req,res){
     res.json("sua user")
    }
    deleteUser(req,res){
     res.json("xoa user")
    }
 }
 module.exports=new userController;