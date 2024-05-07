const router = require("express").Router();
const isUserAuthenticated = require("../utils/isUserAuthenticated");
const getAllUsers = require("../utils/getAllUsers");
const deleteUser = require("../utils/deleteUser");
const { errorDeleteNotSameUser } = require("../locales/fr");
const logoutUser = require("../utils/logoutUser");
const Paths = require("../constants/paths");


//Route authentifiée
router.get(Paths.users, isUserAuthenticated, async (req, res) => {
    const allUsers = await getAllUsers();
    return res.status(200).json({users: allUsers});
});

// Supprimer un utilisateur
router.delete(Paths.users, isUserAuthenticated, async (req, res) => {
    if(req.body.email !== req.session.email) {
        return res.status(401).json({success: false, errorMessage: errorDeleteNotSameUser})
    }
    const isDeleted = await deleteUser(req.body.email);
    if(isDeleted) {
        // Déconnexion auto
        await logoutUser(req, res);
    }
})


module.exports = router;