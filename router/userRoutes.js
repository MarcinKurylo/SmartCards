const express = require("express")
const router = express.Router()
const {isLoggedIn} = require("../middleware/middleware")
const User = require('../models/user')
const Flashcard = require('../models/flashcard')

router.route("/")
.get(isLoggedIn, async(req,res) => {
    const userId = req.user._id
    const flashcards = await Flashcard.find({author: userId})
    res.render("userPage", {flashcards})
})
router.route("/logout")
.get(isLoggedIn, (req, res) => {
    req.logout()
    req.flash("success", "Goodbye!")
    res.redirect("/")
})

module.exports = router