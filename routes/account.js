const getUser = require("../utils/getUser");
const isUserAuthenticated = require("../utils/isUserAuthenticated");

const router = require("express").Router();


// Récupérer les informations de l'utilisateur courant
router.get("/account", isUserAuthenticated, async (req, res) => {
    const user = await getUser({email: req.session.email});
    return res.status(200).json({user});
});


module.exports = router;