const mongoose = require("mongoose")
const GridFsStorage = require("multer-gridfs-storage")
require("dotenv").config({path:'../.env'})
const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@flashchatcluster.a2cmg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const connection = mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => {
    console.log("Connection open")
})
.catch(e => {
    console.log("Error")
    console.log(e)
})
module.exports = connection
