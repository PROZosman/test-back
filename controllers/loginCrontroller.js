const emailValidation = require("../helpers/emailValidation");
const bcrypt = require('bcrypt');
const User = require("../models/userModels");

 async function loginController(req, res) {
    const { email, password } = req.body

    if (!emailValidation(email, password)) {
         return res.status(404).send({
            message : "place enter Invalid email"
         })
    }

    let existingEmail = await User.find({email})

    if (existingEmail.lenth > 0) {
        bcrypt.compare(password, existingEmail[0].password, function(err, result) {
            if (result){
              return res.json({
                "massage" : "login successfully",
                "firstname" : existingEmail[0].firstname,
                "lastname" : existingEmail[0].lastname,
                "email" : existingEmail[0].email,
              })
            }else {
                return res.status(400).send({
                    error : "password not match"
                })
            }

        });
    }else {
        return res.status(404).send({
            message : "email not match"
        })
    }

 }

 module.exports = loginController;