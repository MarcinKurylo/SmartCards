const express = require("express")
const router = express.Router()
const {isLoggedIn} = require("../middleware/middleware")
const User = require('../models/user')
const Flashcard = require('../models/flashcard')
const multer = require("multer")
const {storage} = require("../cloudinaryConfig/cloudinary")
const upload = multer({storage})



router.route("/add")
.get(isLoggedIn, (req, res) => {
    res.render("addFlashcard")
})
.post(upload.single("image"), async(req, res) => {
    try {
        const {path, filename} = await req.file
        const flashcard = new Flashcard({
            language1text : req.body.language1,
            language2text : req.body.language2,
            image : {
                url : path,
                filename : filename
            },
            author : req.user._id
        })
        await flashcard.save()
        req.flash("success", "Successfully added a flashcard!")
        res.redirect("/user/flashcard/add")
    } catch (e){
        req.flash("error", e.message)
        res.redirect("/user/flashcard/add")
    }
})
router.route("/:id")
.get(isLoggedIn, async(req,res) => {
    const imageID = req.params.id;
    const flashcard = await Flashcard.findById(imageID)
    res.render("showFlashcard", {flashcard})
})
.delete(isLoggedIn, async(req,res) => {
    try{
        const imageID = req.params.id;
        await Flashcard.findByIdAndDelete(imageID)
        req.flash("success", "Deleted successfully")
        res.redirect("/user")
    } catch (e) {
        req.flash("error", e.message)
        res.redirect
    }
})
router.route("/:id/edit")
.get(isLoggedIn, async(req,res) => {
    const imageID = req.params.id;
    const flashcard = await Flashcard.findById(imageID)
    res.render("editFlashcard", {flashcard})
})
.put(upload.single("image"), isLoggedIn, async(req,res) => {
    try {
        const imageID = req.params.id
        const {language1, language2} = req.body
        const flashcard = await Flashcard.findById(imageID)
        let path
        let filename
        const file = await req.file
        if (file){
            path = file.path
            filename = file.filename
        } else {
            path = flashcard.image.url
            filename = flashcard.image.filename
        }
        await flashcard.updateOne({ $set: { 
            language1text: language1, 
            language2text: language2, 
            image : {
                url : path,
                filename : filename,
            }}})
        req.flash("success", "Edited successfully")
        res.redirect("/user")
    } catch (e) {
        req.flash("error", e.message)
        res.redirect(`/user/flashcard/${req.params.id}/edit`)
    }
    
    
})
module.exports = router