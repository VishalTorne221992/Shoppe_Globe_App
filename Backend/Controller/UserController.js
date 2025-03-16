import User from "../Model/UserModel.js"
import bcrypt from 'bcrypt';

// create user and save to mongodb
export const createUser = async (req, res) => {

    let { Firstname, Lastname, email, password} = req.body
    console.log('sent email', email)

         try {
             
             User.register(new User({Firstname: Firstname, email: email, Lastname: Lastname}), password, function (err, user){
                if(err){
                    res.json({ success : false, message : 'Your account could not be saved. Error:' + err})
                }else{
                    req.login(user, function(err){
                        if(err){
                            res.json({ success : false, message : err});
                        }else{
                            res.json({ success : true, message : "Your account has been saved"})
                        }
                    })
                }
             })
             
         } catch (error) {
             res.status(500).send({
                 message : error.message })
         }

    
    
}

// get all user information from mongodb
export const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.send(users)
}

