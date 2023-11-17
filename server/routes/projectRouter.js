const router = require("express").Router();
const Project = require("../models/projectSchema");


// Creating Project
router.post("/addProject", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const createdBy = req.body.createdBy;
  const formData = new Project({
    title: title,
    description: description,
    createdBy: createdBy,
  });
  await formData.save();
  return res.send({ status: 200, message: "Project created sucessfully." });
});

// Removing Project
router.post("/removeProject", async (req, res) => {
  const title = req.body.title;
  Project.deleteMany({ title: title }).then(function (data, docs) {
    return res.send({ status: 200, message: "Project removed sucessfully." });
  });
});


// Fetch all projects
router.get("/getAllProjects", async (req, res) => {
  Project.find({}).then(function (data, docs) {
    res.send({status: 200, data: data, message: "All projects fetched sucessfully."});
  });
});

// Fetch specific project
router.get("/getProject", async (req, res) => {
  const title = req.query.title;
  Project.find({title: title}).then(function (data, docs) {
    res.send({status: 200, data: data, message: "Project fetched sucessfully."});
  });
});


module.exports = router;