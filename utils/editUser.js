const getUser = require("../utils/getUser")

module.exports = async (email, {name, firstname}) => {
    try {
        const user = await getUser({email});
        if(name) user.name = name;
        if(firstname) user.firstname = firstname;
        console.log(user);
        await user.save();
        return user;
    } catch {
        return null;
    }
}