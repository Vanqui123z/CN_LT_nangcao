const express = require("express");
const router = express.Router();
const eventController =require("../controllers/eventController");


router.get("/",eventController.getEvent);
router.post("/create",eventController.createEvent);
router.put("/edit",eventController.editEvent);
router.delete("/delete",eventController.deleteEvent);

module.exports = router;