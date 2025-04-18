const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const userController =require("../controllers/userController");


router.get("/",userController.getUser);
router.post("/logout",userController.logout)
module.exports = router;