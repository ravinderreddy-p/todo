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

//POST request to save todo task in database
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

//GET all tasks
app.get("/getAllTasks",getAllTasks)
function getAllTasks(req,res){
    Task.find().then(
        function(tasks){
            res.json(tasks)
        },
        function(err){
            res.sendStatus(400)
        }
    )   
}

//DELETE task
app.delete('/deleteTask/:id', async (req, res) => {
    try {
        const user = await Task.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

//UPDATE task
app.patch('/updateTask/:id', async (req, res) => {
    try {
        const user = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true } )
        
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(3000,function(){
    console.log("server started on port 3000");
});
