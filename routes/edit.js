const router = require("express").Router();
const isUserAuthenticated = require("../utils/isUserAuthenticated");
const editUser = require("../utils/editUser");
const { errorUpdateUser, errorUpdateNotSameUser } = require("../locales/fr");


router.patch("/edit", isUserAuthenticated, async (req, res) => {
    console.log(req.session.isAuth);
    if(req.body.email !== req.session.email) {
        return res.status(401).json({success: false, errorMessage: errorUpdateNotSameUser})
    }
 
    const user = await editUser(req.body.email, {name: req.body.name, firstname: req.body.firstname, password: req.body.password, passwordConfirm: req.body.passwordConfirm});
    if(user) {
        return res.status(200).json({success: true, user});
    } else {
        return res.status(500).json({success: false, errorMessage: errorUpdateUser});
    }
});


module.exports = router;