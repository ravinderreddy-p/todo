const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todoDB", {useNewUrlParser : true});

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

const tasksSchema = new mongoose.Schema({
    taskID : Number,
    taskName : String,
    createdOn : String
});

const Task = mongoose.model("Task",tasksSchema);



app.post("/addTasks",function(req,res){

    console.log(req.body.taskID);
    console.log(req.body.taskName);
    console.log(req.body.createdOn);

    const task = new Task({
        taskID : req.body.taskID,
        taskName : req.body.taskName,
        createdOn : req.body.createdOn
    });

    task.save();

    res.sendStatus(200);

});

app.listen(3000,function(){
    console.log("server started on port 3000");
});
