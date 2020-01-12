const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize')
const models = require('../models');
const methods = require('../methods')
var { sequelize } = models;
var auth = require('../middlewares/auth')
var authst =require('../middlewares/authstudent')

router.get('/', (req,res) => {
   res.render('student-login',{title:'Login'});
})

router.get('/login', (req,res) => { 
   res.render('login',{title:'Login'});
})

router.get('/registration',(req,res) => {
   methods.user.ifAdmin()
   .then(result => {
      if(!result){
         res.render('register',{title:'Register'});
      }
      else{
         res.redirect("/")
      }
   })
   .catch(err=>{
      console.log(err)
   })
})   

router.get('/logout',(req,res)=>{
   req.session.destroy(function(){
     console.log("user logged out.")
  });
  res.redirect('/login');
 })

router.get("/logout-student",(req,res) => {
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/');
})

router.use('/loginSubmit',require('./authentication/login'));
router.use('/studLogin',require('./authentication/stud-login'));
router.use('/register',require('./authentication/register'));

router.use('/admin',auth,require('./admin/index'))
router.use('/HOD',auth,require('./HOD/index'))
router.use('/advisor',auth,require('./advisor/index'))
router.use('/student',authst,require('./student/index'))

router.use('/filltables',require('./filltables'))

module.exports = router;