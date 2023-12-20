const emailValidation = require("../helpers/emailValidation.js");
const nameValidation = require("../helpers/nameValidation.js");
const bcrypt = require('bcrypt');
const User = require("../models/userModels.js");
const SendEmail = require("../helpers/SendEmail.js");
const otpTemplate = require("../helpers/otpTemplate.js");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const { genarateToken } = require("../helpers/token.js");


async function registratincontrollers(req, res) {

    try {

        const { firstname,lastname,email,password,telephon,address,city,postCode,country,state,bYear,bMonth,bDay} = req.body;
        
        if (!nameValidation(firstname)){
             return res.status(400).json ({
                message : "Invalid firstname"
            })
        }
        
        if (!nameValidation(lastname)){
            return res.json({ 
                message: "Invalid lastname"
            })
        }
        
        if (!emailValidation(email)){
            return res.status(400).json({ 
                message: "Invalid email"
            })
        }

        let existingMail = await User.find({email})
        if ( existingMail.length > 0 ){
            return res.status(400).json({ 
                message : "Email already exists"
            })
        } 

        bcrypt.hash(password, 10, async function(err, hash) {
            let userData = new User({ 
               firstname,
               lastname,
               email,
               password : hash,
               telephon,
               address,
               city,
               postCode,
               country,
               state,
               bYear,
               bMonth,
               bDay,
            })
            userData.save()

            const token = genarateToken({
                id : userData._id.toString()
            },"30m")

            const generator2 = aleaRNGFactory(Date.now());
            let randomOTP = generator2.uInt32().toString().substring(0,4)
            let randomOTPStore = await User.findOneAndUpdate({email},{$set: {randomOTP : randomOTP}}, {new : true})
            SendEmail(email,randomOTPStore,otpTemplate)

            res.json({
                id : userData._id,
                success:'Resgistration  Successfull',
                firstname : userData.firstname,
                lastname : userData.lastname,
                token : token,      
                email : userData.email,
                bYear : userData.bYear,
                bMonth : userData.bMonth,
                bDay : userData.bDay,
            })
        });
    
         } catch (error) {
            res.send(error.massage);
        }
    }

module.exports = registratincontrollers;
