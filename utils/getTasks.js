const Task = require('../models/Task');
const Link = require('../models/Link');

module.exports = async () => {
    try {
        const tasks = (await Task.find({}, {_id: 0, __v: 0})).map(task => task.toObject()).map(task => {
            task.id = task.taskId;
            delete task.taskId;
            return task;
        });
        const links = (await Link.find({}, {_id: 0, __v: 0})).map(link => link.toObject()).map(link => {
            link.id = link.linkId;
            delete link.linkId;
            return link;
        });

        
        return {
            data: tasks,
            links
        }
    } catch (e) {
        return null;
    }
    
}