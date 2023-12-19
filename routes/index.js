const express = require ( 'express')
const router = express.Router()


const api = process.env.BASE_URL
const apiRouters = require('./api')


router.use(api, apiRouters)

router.use(api, (req, res)=>{
    res.send("no api found on this router")
})


http: module.exports = router