const express = require('express');
const router = express.Router();
const methods = require('../../methods')

const models = require('../../models');

const state = {
    username: null,
    token: null
}

router.post('/',(req,res)=>{
    state.username = req.body.username;
    methods.authentication.authenticateStudent(state.username)
    .then(result => {
        // console.log(result.token);
        state.token = result.token;
        res.render('otp',{user : state.username , msg : ""})
    })
    .catch(err => {
       res.redirect("/?success=false")
    })
})

router.post('/confirmOtp',(req,res)=>{
    // state.username = req.body.username;
    // methods.authentication.authenticateStudent(state.username)
    // .then(result => {
    //     // console.log(result.token);
    //     state.token = result.token;
    // })
    if(state.username === req.body.username && state.token === req.body.otp){
        console.log("Inside post /login")
        username = req.body.username;
        // req.userID = userID;
        // req.
        methods.authentication.authenticateStud(username)
        .then(result=>{
            console.log("Logged in")
            console.log(result.token)
            req.token = result.token
            req.session.token = result.token
            if(result.type === "student"){
                res.redirect("/student/dashboard")        
            }
              
        })
        .catch(err=>{
           
            console.log(err)
            res.status(400).json({success : false})
        })
    }
    else {
        username = req.body.username
        res.render('otp',{user : username , msg :"Incorrect OTP"})
    }
})

module.exports.state = state;
module.exports = router;