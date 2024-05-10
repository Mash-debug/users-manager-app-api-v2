const dispatchTask = require("../utils/dispatchTask");
const getTasks = require("../utils/getTasks");
const isUserAuthenticated = require("../utils/isUserAuthenticated");

const router = require("express").Router();
const Paths = require("../constants/paths");
const { errorServer } = require("../locales/fr");


// Gestion des tâches
router.post(Paths.task, isUserAuthenticated, async (req, res) => {
    const taskResult = await dispatchTask(req.body.action, req.body.payload);
    if(taskResult) {
        return res.status(200).json({success: true});
    }
});

// Récupérer les tâches
router.get(Paths.task, isUserAuthenticated, async (req, res) => {
    const tasks = await getTasks();
    if(tasks) {
        return res.status(200).json(tasks);
    } else {
        return res.status(500).json({errorMessage: errorServer})
    }
})


module.exports = router;