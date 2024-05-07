const Paths = require("../constants/paths");

module.exports = async (req, res) => {
    if(req.session) {
        req.session.destroy(() => {
            return res.status(200).json({success: true, isAuth: false, redirect: Paths.login})
        })
        return;
    }
    return res.status(200).json({success: true, isAuth: false, redirect: Paths.login})
}