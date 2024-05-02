const getUser = require("../utils/getUser");
const hashPassword = require("./hashPassword");

module.exports = async (email, {name, firstname, password, passwordConfirm}) => {
    try {
        const user = await getUser({email});
        if(name) user.name = name;
        if(firstname) user.firstname = firstname;
        if(password) {
            if (password === passwordConfirm) {
                const hash = await hashPassword(password);
                user.password = hash;
            } else {
                return null;
            }
        } 
        await user.save();
        // On ne renvoie pas le hash du mot de passe dans la réponse
        const newUser = user.toObject();
        delete newUser.password;
        return newUser;
    } catch {
        return null;
    }
}