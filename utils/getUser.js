const User = require("../models/User");

module.exports = async ({id, email}) => {
    if(!id && !email) return null;

    if(id) {
        try {
            const user = await User.findOne({_id: id}, {__v: 0, password: 0});
            return user;
        } catch {
            return null;
        }
    } else if (email) {
        try {
            const user = await User.findOne({email}, {__v: 0, password: 0});
            return user;
        } catch {
            return null;
        }
    }    
}