const router = require("express").Router();
const { errorEmptyField, errorPasswordMatch, errorUserAlreadyExists, errorServer, errorRegister } = require('../locales/fr');
const userAlreadyExists = require("../utils/userAlreadyExists");
const addUser = require("../utils/addUser");

router.post("/register", async (req, res) => {
    let { name, firstname, email, password, passwordConfirm } = req.body;

    if(!name || !firstname || !email || !password || !passwordConfirm) {
        return res.status(400).json({errorMessage: errorEmptyField});
    }

    passwordConfirm = passwordConfirm.trim();
    password = password.trim();

    // Vérifier si les deux mots de passe correspondent
    if(password !== passwordConfirm) {
        return res.status(400).json({errorMessage: errorPasswordMatch});
    } 

    if(email && password) {

        // Vérifier si un utilisateur n'existe pas déjà dans la base
        const isUserAlreadyExists = await userAlreadyExists(email);
        if(isUserAlreadyExists) {
            return res.status(400).json({errorMessage: errorUserAlreadyExists});
        }

        // Ajouter un utilisateur à la base de données
        const isAdded = await addUser(name, firstname, email, password);
        if(isAdded) {
            // Créer la session et rediriger vers la page 'users'
            req.session.isAuth = true;
            req.session.email = email;
            return res.status(200).json({success: true, isAuth: true, email, redirect: '/users'});
        } else {
            return res.status(500).json({success: false, errorMessage: errorServer})
        }
    } else {
        res.status(400).json({errorMessage: errorRegister});
    }
});


module.exports = router;
