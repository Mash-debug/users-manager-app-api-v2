const router = require("express").Router();
const verifyPassword = require("../utils/verifyPassword");
const userAlreadyExists = require("../utils/userAlreadyExists");
const { errorLogin, errorUserDoesNotExist, errorEmptyField } = require("../locales/fr");
const Paths = require("../constants/paths");


// Api
router.post(Paths.login, async (req, res) => {
    const { email, password } = req.body;
    if(email && password) {
       // Vérifier la combinaision (email, password)
       const user = await userAlreadyExists(email);

       if(user) {
        const isPasswordCorrect = await verifyPassword(password, user.password);

        if(isPasswordCorrect) {
            // Créer la session et rediriger vers la page 'account'
            req.session.isAuth = true;
            req.session.email = email;
            return res.status(200).json({success: true, isAuth: true, email, redirect: '/dashboard/account'});
        } else {
            return res.status(400).json({success: false, errorMessage: errorLogin});
        }

       } else {
        return res.status(400).json({errorMessage: errorUserDoesNotExist});
       }
       
    } else {
        res.status(400).json({errorMessage: errorEmptyField});
    }
});

module.exports = router;
