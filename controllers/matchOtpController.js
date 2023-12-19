const User = require("../models/userModels.js");     

async function matchOTP (req, res) {

  const {randomOTP,email} = req.body;

  const existingMail = await User.find({email})
  
 if (existingMail[0].randomOTP === randomOTP) {
    const removeOTP = await User.findOneAndUpdate({email}, {$unset: {"randomOTP" : ""}}, {new : true})
   return res.json({
        success: "OTP Matched"
    })
   
 } else {
    res.json({
        success: "OTP Not Matched"
    })
 }

}

module.exports = matchOTP