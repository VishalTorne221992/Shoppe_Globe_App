import mongoose from "mongoose";
import passsportLocalMongoose from 'passport-local-mongoose'

// Created a user schema to store user information to accessed from mongodb
// this schema is used by passport middleware package for storing in DB and authentication
const userSchema = new mongoose.Schema({
    Firstname : {
        type: String,
        required : [true, "First name is required"]
    },
    Lastname : {
        type: String,
        required : [true, "Last name is required"]
    },
    email : {
        type : String,
        required: [true, "Email is required"],
        unique: true                                               
    }
})

// passport plugin to authenticate the user with login info
userSchema.plugin(passsportLocalMongoose,{usernameField: 'email'});

const User = mongoose.model('users', userSchema);

export default User;