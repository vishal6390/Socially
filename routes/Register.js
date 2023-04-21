const router = require("express").Router();
const User = require('../models/User')

router.post("/", (req, res) => {

    const {username, email, password, age, dob, profilePic} = req.body

    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User Already Registered goto login page"})
        }else{
            const user = new User({
                username,
                email,
                password,
                age,
                dateOfBirth: dob,
                profilePic
            })
        
            user.save(err => {
                if(err){
                    res.send({err, message: "Error occured"})
                }else{
                    res.send({message: "Successfully Registered"})
                }
            })
        }
    })
})

module.exports = router