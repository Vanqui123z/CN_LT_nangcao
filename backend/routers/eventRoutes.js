const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const eventController =require("../controllers/eventController");
const homeController = require("../controllers/homeController");


// router.get("/",authMiddleware,eventController.getEvent);
// router.post("/create",authMiddleware,eventController.createEvent);
// router.put("/edit",authMiddleware,eventController.editEvent);
// router.delete("/delete",authMiddleware,eventController.deleteEvent);


router.get("/",eventController.getEvent);
router.post("/create",eventController.createEvent);
router.put("/edit",eventController.editEvent);
router.delete("/delete",eventController.deleteEvent);



// router tab

router.get('/calendar',homeController.calendarShow);

router.get('/todolist',homeController.todolistShow);

router.get('/plan',homeController.planShow );

router.get('/profile',homeController.profileShow );
module.exports = router;