const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
    taskId: Number,
    parent: Schema.Types.Mixed,
    duration: Number,
    progress: Number,
    start_date: String,
    end_date: String,
    text: String
});

const TaskModel = model("Task", TaskSchema);
module.exports = TaskModel;