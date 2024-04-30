const User = require('../models/User');

module.exports = async (email) => {
    if(!email) return null;
    try {
        await User.deleteOne({email});
        return true;
    } catch {
        return null;
    }
}