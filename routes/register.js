const router = require("express").Router();
const { errorEmptyField, errorPasswordMatch, errorUserAlreadyExists, errorServer, errorRegister, errorEmailNotValid } = require('../locales/fr');
const userAlreadyExists = require("../utils/userAlreadyExists");
const addUser = require("../utils/addUser");
const Paths = require("../constants/paths");

router.post(Paths.register, async (req, res) => {
    let { name, firstname, email, password, passwordConfirm } = req.body;

    passwordConfirm = passwordConfirm.trim();
    password = password.trim();

    if(!name || !firstname || !email || !password || !passwordConfirm) {
        return res.status(400).json({errorMessage: errorEmptyField});
    }


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

        // On vérifie la conformité de l'adresse mail
        const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/;
        if(!emailRegexp.test(email)) {
            return res.status(400).json({errorMessage: errorEmailNotValid});
        }

        // Ajouter un utilisateur à la base de données
        const isAdded = await addUser(name, firstname, email, password);
        if(isAdded) {
            // Créer la session et rediriger vers la page 'account'
            req.session.isAuth = true;
            req.session.email = email;
            return res.status(200).json({success: true, isAuth: true, email, redirect: '/dashboard/account'});
        } else {
            return res.status(500).json({success: false, errorMessage: errorServer})
        }
    } else {
        res.status(400).json({errorMessage: errorRegister});
    }
});


module.exports = router;
