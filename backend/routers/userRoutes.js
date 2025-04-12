const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const userController =require("../controllers/userController");


router.get("/",authMiddleware,userController.getUser);
router.post("/create",authMiddleware,userController.createUser);
router.put("/edit",authMiddleware,userController.editUser);
router.delete("/delete",authMiddleware,userController.deleteUser);

module.exports = router;