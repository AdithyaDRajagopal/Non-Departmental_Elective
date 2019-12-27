const express = require('express')
const router = express.Router()
const models = require('../../models')
const methods = require('../../methods')

router.get('/dashboard',(req,res,next)=>{
  methods.HOD.getHODs().then(function(result){
    var dic = {"HOD":result}
    let hod = []
    for (let i=0; i<dic["HOD"].length; i+=1) {
    hod.push(dic["HOD"][i].dataValues);
    }
    console.log(hod)
    let hoddept = []
    for(let i=0;i<hod.length;i++){
      hoddept.push(hod[i].deptID)
    }
    console.log(hoddept)
    methods.department.getDepts(hoddept).then(function(result){
      //console.log("From routes");
      var dict={"data":result}
      //console.log(dict["data"])
      let depts = [];
    for (let i=0; i<dict["data"].length; i+=1) {
     depts.push(dict["data"][i].dataValues);
    }
    console.log(depts);
      methods.course.getCourses()
      .then(re => {
        console.log(re)
        methods.department.getAllDepts()
        .then(dep => {
          res.render('admindashboard', {"HOD":hod,"data":depts,title : 'Admin Dashboard',dept:dep,course :re});
        })
        .catch(e=>{
          console.log(e);
        })
      })
      .catch(er => {
        console.log(er)
      })
    }).catch(function(err){
        res.json({
            "success":false,
            "data":err
        })
    })
  })
})

router.post("/addHOD", (req,res) => {
    methods.authentication.registerHOD(req.body)
    .then(result => {
        console.log(result)
        methods.HOD.addHOD(req.body)
        .then(re => {
            res.redirect("/admin/dashboard")
        })
    })
})

router.post('/changePassword',(req,res,next) => {
  methods.user.changePasswordHOD(req.body.userID,req.body.password)
  .then(re => {
      res.redirect('/admin/dashboard') //Make redirection to another page saying password change successful
  })
  .catch(er => {
      res.send({success:false,error:er})
  })
})

router.get("/allot",(req,res)=>{
  methods.allotment.allot()
  .then(result => {
    res.redirect("/admin/dashboard")
  })
  .catch(error => {
    console.log(error)
  })
})

router.post("/result",(req,res) =>{
  res.render('result')
})

router.get("/back",(req,res) => {
  res.redirect("/admin/dasdhboard")
})

module.exports = router;