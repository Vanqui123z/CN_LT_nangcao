
class homeController{
    calendarShow(req,res){
        res.render("views/pages/calendar", { title: "Calender"});
    }
    todolistShow(req,res){
        res.render("views/pages/todolist", { title: "Todolist"});
    }
    planShow(req,res){
        res.render("views/pages/plan", { title: "Plan"});
    }
    profileShow(req,res){
        res.render("views/pages/profile", { title: "profile"});
    }


}

module.exports= new homeController;