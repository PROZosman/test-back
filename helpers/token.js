const jwt = require('jsonwebtoken')

exports.genarateToken = (payload,expired) =>{

  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn : expired
  })
  
}
