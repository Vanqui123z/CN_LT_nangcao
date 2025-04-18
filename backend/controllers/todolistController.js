const Event = require("../models/eventModel")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");

class todoListController {

    async addTodolist(req, res, next) {
        try {
            // 
            const token = req.cookies?.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //user
            const userId = decoded.id;
            const user = await User.findById(userId);
            // todolista
            const events = await Event.findOne({ email: user.email });
            const TodoList = events.todolist;
            //

            const newTask = {
                id: Date.now(),
                title: req.body.title,
                isCompleted: false
            };
            console.log(TodoList)
            TodoList.push(newTask);
            await events.save();
            res.json({ success: true, task: newTask });

        } catch (error) {
              res.status(500).json({ message: "Lỗi khi lấy danh sách todo", error });

        }
    }
    async completeTodolist(req, res, next) {
        try {

            // 
            const token = req.cookies?.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //user
            const userId = decoded.id;
            const user = await User.findById(userId);
            // todolista
            const events = await Event.findOne({ email: user.email });
            let TodoList = events.todolist;
            //
            

            const taskId = (req.params.id);
            const task = TodoList.find(t => t.id === taskId);
            if (task) {
                task.isCompleted = !task.isCompleted;
                console.log(task)
                await events.save();
                return res.json({ success: true, task });
            }
        } catch (error) {
              res.status(500).json({ message: "Lỗi khi lấy danh sách event", error });

        }

    }
    async deleteTodolist(req, res, next) {
        try {


             // 
             const token = req.cookies?.token;
             const decoded = jwt.verify(token, process.env.JWT_SECRET);
             //user
             const userId = decoded.id;
             const user = await User.findById(userId);
             // todolist
             const events = await Event.findOne({ email: user.email });
             let TodoList = events.todolist;
             //
             
             const taskId = (req.params.id);

             TodoList = TodoList.filter(t => t.id !== taskId);
             events.todolist = TodoList;
             await events.save();
            res.json({ success: true, deletedId: taskId });
        } catch (error) {
              res.status(500).json({ message: "Lỗi khi lấy danh sách event", error });

        }
    }
}
module.exports = new todoListController;