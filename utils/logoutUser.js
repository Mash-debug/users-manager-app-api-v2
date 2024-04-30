module.exports = async (req, res) => {
    if(req.session) {
        req.session.destroy(() => {
            return res.status(200).json({success: true, isAuth: false, redirect: '/login'})
        })
        return;
    }
    return res.status(200).json({success: true, isAuth: false, redirect: '/login'})
}