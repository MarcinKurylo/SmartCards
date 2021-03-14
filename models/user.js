const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "Email required"],
        unique : [true],
    }
})

userSchema.plugin(passportLocalMongoose) // plugin adds username and password fields

const User = mongoose.model('User', userSchema)

module.exports = User