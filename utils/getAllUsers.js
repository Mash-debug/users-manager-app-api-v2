const User = require("../models/User");

module.exports = async () => {
    try {
        const users = await User.find({}, {name: 1, firstname: 1});
        return users;
    } catch {
        return [];
    }
}