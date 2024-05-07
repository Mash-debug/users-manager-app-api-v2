const logoutUser = require("../utils/logoutUser");

const router = require("express").Router();
const Paths = require("../constants/paths");


// Déconnexion
router.get(Paths.logout, async (req, res) => {
    await logoutUser(req, res);
});


module.exports = router;