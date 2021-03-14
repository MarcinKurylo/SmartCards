const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require('../models/user')

router.route("/")
.get((req,res) => {
    res.render("home")
})
router.route("/login")
.get((req,res) => {
    res.render("login")
})
.post(passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), (req, res) => {
    req.flash("success", "Welcome!")
    res.redirect("/user")
})
router.route("/register")
.get((req,res) => {
    res.render("register")
})
.post(async (req, res) => {
    try {
        const {email, username, password} = req.body
        const user = new User({email, username})
        const registeredUser = await User.register(user, password)
        req.flash("success", "Successfully registered! You can now log in ;)")
        res.redirect("/")
    } catch (e) {
        req.flash("error", e.message)
        res.redirect("/")
    }
    
})


module.exports = router