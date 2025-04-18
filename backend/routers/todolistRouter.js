const express = require("express");
const router = express.Router();
const todolistController = require("../controllers/todolistController")

router.post("/add",todolistController.addTodolist);
router.put("/complete/:id",todolistController.completeTodolist);
router.delete("/delete/:id",todolistController.deleteTodolist);


module.exports= router;

