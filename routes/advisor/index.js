const express = require('express')
const router = express.Router()

const methods = require('../../methods')

router.get("/dashboard", (req,res,next) => {
    methods.advisor.getAdvisorDetails(req.decoded.id)
    .then(result => {
        dept = result.dataValues.deptID
        methods.elective.getElecDept(dept)
        .then(re => {
            res.render('advisor', {title : 'Advisor Dashboard',elective:re});
        })
        .catch(er => {
            console.log(er)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/addStudent", (req,res) => {
    methods.advisor.getAdvisorDetails(req.decoded.id)
        .then(result => {
            var dept = result.dataValues.deptID
            var adv = result.dataValues.id
            methods.authentication.registerStudent(req.body)
            .then(rest => {
            console.log(rest)
            methods.student.addStudent(req.body,dept,adv)
            .then(re => {
                var cid = req.body.elective
                if (typeof cid === "string") {
                    methods.elective.addElective(req.body,cid)
                }
                    else if (typeof cid === "object") {

               for(var i=0;i<cid.length;i++){
                   console.log(cid[i])
                methods.elective.addElective(req.body,cid[i])
                }
            }
                console.log(cid)
                res.redirect("/advisor/dashboard")
           })
        })
    })
    .catch(err => {
            console.log(err)
    })
})

router.post("/changePassword", (req,res) => {
    methods.user.changePasswordStudent(req.body.userID,req.body.password)
  .then(re => {
      res.redirect('/advisor/dashboard') 
  })
  .catch(er => {
      res.send({success:false,error:er})
  })
})


module.exports = router;