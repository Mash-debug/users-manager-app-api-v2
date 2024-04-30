const bcrypt = require("bcrypt");
const User = require('../models/User');
const salt = 10;

module.exports = async (name, firstname, email, password) => {
    const hash = await bcrypt.hash(password, salt);
    const user = new User({name, firstname, email, password: hash});

    try {
        await user.save();
        return true;
    } catch {
        return false;
    }
    
}