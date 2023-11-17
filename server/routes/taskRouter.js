const router = require("express").Router();
const Task = require("../models/taskSchema");


// Creating Task
router.post("/addTask", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const createdBy = req.body.createdBy;
  const projectId = req.body.projectId;
  const formData = new Task({
    title: title,
    description: description,
    createdBy: createdBy,
    projectId: projectId,
  });
  await formData.save();
  return res.send({ status: 200, message: "Task created sucessfully." });
});

// Removing Task
router.post("/removeTask", async (req, res) => {
  const title = req.body.title;
  const projectId = req.body.projectId;
  Task.deleteOne({ title: title, projectId: projectId }).then(function (data, docs) {
    return res.send({ status: 200, message: "Task removed sucessfully." });
  });
});

// Update Task

router.post("/updateTask", async(req, res) => {
    const title = req.body.title;
    const projectId = req.body.projectId;
    const attributes = req.body.fields;
    const values = req.body.values;
    let currTask = await Task.findOne({title: title, projectId: projectId});
    for(var i = 0; i < attributes.length; i++) {
        currTask[attributes[i]] = values[i];
    }
    await currTask.save();
    return res.send({ status: 200, message: "Task updated sucessfully." });
})
// Fetch all task for specifc project
router.get("/getAllTasks", async (req, res) => {
  const projectId = req.query.projectId;
  Task.find({projectId: projectId}).then(function (data, docs) {
    res.send({status: 200, data: data, message: "All tasks of specific project fetched sucessfully."});
  });
});

// Fetch specific task
router.get("/getTask", async (req, res) => {
  const title = req.query.title;
  const projectId = req.query.projectId;
  Task.find({title: title}).then(function (data, docs) {
    res.send({status: 200, data: data, message: "Task fetched sucessfully."});
  });
});


module.exports = router;