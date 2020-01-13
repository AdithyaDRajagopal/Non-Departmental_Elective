const express = require('express')
const router = express.Router()
const models = require('../../models')
const methods = require('../../methods')

router.get("/dashboard", (req,res,next) => {
        methods.HOD.getHODDetails(req.decoded.id)
        .then(result => {
            var dept = result.dataValues.deptID
            methods.course.getOfferedCourses(dept)
            .then(re => {
              console.log(re)
              methods.course.getSelectedCourses(dept)
              .then(re2 =>{
                  if(dept != "MA")
                res.render('hodma', {title : 'HOD Dashboard',course :re, selcourse : re2});
                else
                res.render('hodma', {title : 'HOD Dashboard',course :re, selcourse : re2});
              })
            })
            .catch(er => {
              console.log(er)
            })
        })
         
})

router.post("/addAdvisor", (req,res) => {
    methods.HOD.getHODDetails(req.decoded.id)
        .then(result => {
            var dept = result.dataValues.deptID
            methods.authentication.registerAdvisor(req.body)
            .then(rest => {
            console.log(rest)
            methods.advisor.addAdvisor(req.body,dept)
            .then(re => {
            res.redirect("/HOD/dashboard")
           })
        })
    })
    .catch(err => {
            console.log(err)
    })
})

router.post("/changePassword", (req,res) => {
    methods.user.changePasswordAdvisor(req.body.userID,req.body.password)
  .then(re => {
      res.redirect('/HOD/dashboard') //Make redirection to another page saying password change successful
  })
  .catch(er => {
      res.send({success:false,error:er})
  })
})

router.post("/selCourse", (req,res) =>{
    methods.course.offerCourse(req.body)
    .then(result => {
        console.log(result)
        res.redirect("/HOD/dashboard")
    })
    .catch(er => {
        res.send({success:false,error:er})
    })
})

router.post("/deleteCourse", (req,res) => {
    methods.course.deleteOfferedCourse(req.body)
    .then( result => {
        console.log(result)
        res.redirect("/HOD/dashboard")
    })
    .catch(err => {
        res.send({success:false,error:err})
    })
})

module.exports = router;