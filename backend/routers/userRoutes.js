const express = require("express");
const router = express.Router();

const userController =require("../controllers/userController");


router.get("/",userController.getUser);
router.post("/create",userController.createUser);
router.put("/edit",userController.editUser);
router.delete("/delete",userController.deleteUser);

module.exports = router;