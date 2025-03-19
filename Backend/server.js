import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import path from 'path'
import passport from 'passport'
import User from "./Model/UserModel.js"
import { routes } from './Routes/ShoppeGlobe_Routes.js';
import flash from 'express-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';

// create a express app
const app = express();

// use neccessary packages for parsing json, cookie and using session in the app. 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(flash())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized : false
}))

// use passport package of nodejs for authentication of the user and login
app.use(passport.initialize());
app.use(passport.session())

// add cors package to allow cors
app.use(cors({ 
    origin: true,
    credentials : true}));

// connect mongoose to mongodb atlas using the connect method and a connection string obtained
// by creating a database in mongodb atlas
mongoose.connect("mongodb+srv://vt221992:ZQ11v9dnIzLJLUZZ@shoppeglobecl.nh3up.mongodb.net/ShoppeGlobeDB")

// get connection
const db = mongoose.connection;


// when database is connected show connection successful or error

db.on("open", () => {
    console.log("DB Connection successful");
})

db.on("error", () => {
    console.log("DB connection failed");
})

// run validators provided for the mongoose schema
mongoose.set('runValidators', true)

//let PORT = process.env.RENDER_PORT || 4002;

app.listen(4002, () => {
    console.log("server is running on port 4002");
})

console.log("connected api")



// app.get('/', (req, res) => {
//     res.send({message : "hello"})
// })

if(process.env.NODE_ENV=="production"){
    
    app.use(express.static(path.resolve(__dirname, "/dist")))
    console.log(path.resolve(__dirname, "/dist/index.html"),'this is the path that needs to be resolved')
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "dist", "index.html"))
    })
}

// created a separate routes file for all app route handling and authentication/authorization
routes(app, passport)