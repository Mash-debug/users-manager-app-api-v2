const Task = require("../models/Task");
const Link = require("../models/Link");

module.exports = async (action, payload) => {
  if (payload.source) {
    switch (action) {
      case "create":
        try {
          const newLink = await Link.create({
            linkId: payload.id,
            source: payload.source,
            target: payload.target,
            type: payload.type,
          });
          return newLink;
        } catch (e) {
          return null;
        }
      case "delete":
        try {
          const deletedLink = await Link.deleteOne({ linkId: payload.id });
          return deletedLink.deletedCount;
        } catch (e) {
          return null;
        }
    }
  }

  switch (action) {
    case "create":
      try {
        const newTask = await Task.create({
          taskId: payload.id,
          duration: payload.duration,
          end_date: payload.end_date,
          parent: payload.parent,
          progress: payload.progress,
          start_date: payload.start_date,
          text: payload.text,
        });
        return newTask;
      } catch (e) {
        return null;
      }
    case "update":
      try {
        const updatedTask = await Task.updateOne(
          { taskId: payload.id },
          {
            taskId: payload.id,
            duration: payload.duration,
            end_date: payload.end_date,
            parent: payload.parent,
            progress: payload.progress,
            start_date: payload.start_date,
            text: payload.text,
          }
        );
        return updatedTask.modifiedCount;
      } catch (e) {
        return null;
      }
    case "delete":
      try {

        // On supprime tous les liens associés à cette tâche
        await Link.deleteMany({source: payload.id});
        await Link.deleteMany({target: payload.id});

        const deletedTask = await Task.deleteOne({
          taskId: payload.id,
        });

        return deletedTask.deletedCount;
      } catch (e) {
        return null;
      }
  }
};
