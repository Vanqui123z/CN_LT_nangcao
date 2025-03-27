class eventController  {
   getEvent(req,res){
    res.json("danh sach event")
   }
   createEvent(req,res){
    res.json("tao danh sach")
   }
   editEvent(req,res){
    res.json("sua danh sach")
   }
   deleteEvent(req,res){
    res.json("xoa danh sach")
   }
}
module.exports=new eventController;