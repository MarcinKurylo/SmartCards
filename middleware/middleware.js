module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        return next()
    } else {
        req.flash("error", "You must be signed in!")
        return res.redirect("/login")
    }
} 