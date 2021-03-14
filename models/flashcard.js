const mongoose = require("mongoose")

const flashcardSchema = new mongoose.Schema({
    language1text : {
        type : String,
        required : true
    },
    language2text : {
        type : String,
        required : true
    },
    image : {
        url : String,
        filename : String
    },
    author : {
        type : String,
        required : false
    }
})

const Flashcard = mongoose.model("Flashcard", flashcardSchema)
module.exports = Flashcard