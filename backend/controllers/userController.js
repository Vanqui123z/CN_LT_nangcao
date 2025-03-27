class userController  {
    getUser(req,res){
     res.json("danh sach user")
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