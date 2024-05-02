const bcrypt = require("bcrypt");
const salt = 10;

module.exports = async (password) => {
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
