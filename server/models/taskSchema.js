const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    projectId: {type: String, required: true},
    description: { type: String },
    status: { type: String, enum: ['todo', 'inprogress', 'completed'], default: 'todo' },
    createdAt: { type: Date, default: Date.now },
    createdBy: {type: String}
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;