const getUser = require("../utils/getUser");
const isUserAuthenticated = require("../utils/isUserAuthenticated");
const router = require("express").Router();
const Paths = require("../constants/paths");


// Récupérer les informations de l'utilisateur courant
router.get(Paths.account, isUserAuthenticated, async (req, res) => {
    const user = await getUser({email: req.session.email});
    return res.status(200).json({user});
});


module.exports = router;