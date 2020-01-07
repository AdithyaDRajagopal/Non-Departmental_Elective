const express = require('express');
const router = express.Router();
const methods = require('../../methods')

const models = require('../../models');

router.post('/',(req,res)=>{
    console.log("Inside post /login")
    console.log(req.body)
    username = req.body.username;
    password = req.body.password;
    // req.userID = userID;
    // req.
    methods.authentication.authenticateUser(username,password)
    .then(result=>{
        console.log("Logged in")
        console.log(result.token)
        req.token = result.token
        req.session.token = result.token
        req.session.type = result.type
        console.log(result.type)
        if(result.type == 'Admin')
            res.redirect('/admin/dashboard')
        else if(result.type == 'HOD')
            res.redirect('/HOD/dashboard')    
        else if(result.type == 'Advisor')
            res.redirect('/advisor/dashboard')
//        else if(result.type == "Student")
  //          res.redirect('/student/dashboard')
        
        
    })
    .catch(err=>{
       
        console.log(err)
        res.status(400).json({success : false})
    })
})

module.exports = router;