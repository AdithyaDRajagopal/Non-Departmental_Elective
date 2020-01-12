var express = require('express')
var app = express()

var methods = require('./methods')

methods.course.unfill()
.then( re => {
    console.log("Cleared")
})