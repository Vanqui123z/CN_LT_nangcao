const Event = require("../models/eventModel")

class eventController {
   async getEvent(req, res) {
      try {
         
         const events = await Event.find();
         res.render("views/pages/home", { title: "Home Page", events });
      } catch (error) {
         res.status(500).json({ message: "Lỗi khi lấy danh sách event", error });
      }
   }
   createEvent(req, res) {
      res.json("tao danh sach")
   }
   editEvent(req, res) {
      res.json("sua danh sach")
   }
   deleteEvent(req, res) {
      res.json("xoa danh sach")
   }
}
module.exports = new eventController;