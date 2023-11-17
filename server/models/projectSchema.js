const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {type: String,},
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    createdBy: {type: String}
});

const User = mongoose.model("project", projectSchema);
module.exports = User;
