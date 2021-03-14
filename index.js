const express = require("express")
require("dotenv").config()
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const connection = require('./connection/connection')
const User = require('./models/user')
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const basicRoutes = require("./router/basicRoutes")
const userRoutes = require("./router/userRoutes")
const flashcardRoutes = require("./router/flashcardRoutes")
const methodOverride = require("method-override")

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(flash())
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie : {
        httpOnly : true,
        expires : Date.now() + (7 * 24 * 3600) * 1000, // expires within one week
        maxAge : (7 * 24 * 3600) * 1000
    }
}
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session()) // provide persistent login
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use((req, res, next) => {
    // defining some variables for ejs
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currentUser = req.user
    return next()
})
app.use(basicRoutes)
app.use("/user", userRoutes)
app.use("/user/flashcard", flashcardRoutes)
  

app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})