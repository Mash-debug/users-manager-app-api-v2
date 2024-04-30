const logoutUser = require("../utils/logoutUser");

const router = require("express").Router();


// Déconnexion
router.get("/logout", async (req, res) => {
    await logoutUser(req, res);
});


module.exports = router;