const Paths = require("../constants/paths");

module.exports = async (req, res, next) => {
    if(req.session.isAuth) {
        next();
    } else {
        return res.status(401).json({success: false, isAuth: false, redirect: Paths.login});
    }
}