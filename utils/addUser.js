const hashPassword = require('../utils/hashPassword');
const User = require('../models/User');


module.exports = async (name, firstname, email, password) => {
    const hash = await hashPassword(password);
    const user = new User({name, firstname, email, password: hash});

    try {
        await user.save();
        return true;
    } catch {
        return false;
    }
    
}