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
        console.log("Worked");
    }
    else {
        console.log("Wrong OTP");
    }
})

module.exports.state = state;
module.exports = router;