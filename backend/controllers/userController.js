const User = require("../models/userModel")

class userController  {
  
    async getUser(req, res){
        try{
            const user = await User.findById(req.user.id);
            console.log(user)
            res.render("views/pages/profile", { user });
        }catch(error){
            res.status(500).json({ message: "Lỗi khi lấy danh sách user", error });
        }
    } 
    logout(req,res){
        res.clearCookie('token'); // Xóa token cookie
        req.session?.destroy(() => { // Nếu bạn dùng session
        res.status(200).json({ message: "Đã logout" });
        });
    }
 }
 module.exports=new userController;