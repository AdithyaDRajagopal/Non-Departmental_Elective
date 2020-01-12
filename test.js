var express = require('express')
var app = express()

var methods = require('./methods')

methods.result.getResults()
.then( result => {
    
})