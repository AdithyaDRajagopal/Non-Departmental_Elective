const express = require('express')
const router = express.Router()
const methods = require('../../methods')
const models = require('../../models')

router.post('/', (req,res) => {
    methods.authentication.registerAdmin(req.body)
    res.redirect("/filltables");
})

module.exports = router;