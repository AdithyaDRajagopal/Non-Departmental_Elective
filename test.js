var express = require('express')
var app = express()

var methods = require('./methods')

methods.student.generateRankList()
.then(result => {
    console.log(result)
})