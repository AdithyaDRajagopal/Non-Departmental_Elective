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
        methods.student.generateRankList()
    .then(res => {
        var dic = {"student":res}
                    let student = []
                    for (let i=0; i<dic["student"].length; i+=1) {
                    student.push(dic["student"][i].dataValues);
                    }
                    for(let x=0;x<student.length;x++){
                        methods.student.viewChoice(student[x].id)
                        .then(re2 => {
                            
                            var dic2 = {"choice":re2}
                            let choice = []
                            for (let i=0; i<dic2["choice"].length; i+=1) {
                            choice.push(dic2["choice"][i].dataValues);
                            }
                            for(var y=0;y<choice.length;y++){
                                methods.course.getCourse(choice[y].courseID)
                                .then(re3 => {
                                    var dic3 = {"course":re3}
                                    let course = []
                                    for (let i=0; i<dic3["course"].length; i+=1) {
                                    course.push(dic3["course"][i].dataValues);
                                    }
                                    if(course[0].filled < course[0].capacity)
                                    {   console.log(course[0].filled)
                                        methods.result.getResultStudent(student[x].id)
                                        .then(re5 => {
                                         console.log(re5.length)
                                         if(re5.length == 0){
                                            methods.result.addResult(course[0].courseID,student[x].id,course[0].name,student[x].name)
                                        .then(re => {
                                            console.log(course[0].courseID + "+" + student[x].id + "+" + course[0].name + "+" + student[x].name)
                                            methods.course.fill(course[0].courseID,course[0].filled)
                                            .then(r2 => {
                                                console.log(r2)  
                                            })
                                            .catch(e2 => {
                                                console.log(e2)
                                            })
                                        })
                                        .catch(er => {
                                           console.log(er)
                                        })
                                        }
                                        })
                                        
                                    } 
                                })    
                            }    
                        })    
                    }    
    })
    .catch(err => {
        console.log(err)
    })
      res.redirect("/admin/dashboard")
})

router.get("/courses",(req,res)=> {
  methods.course.getCourses()
  .then(re => {
    res.render('course',{title:'courses',result:re})
  })
})

router.get("/result",(req,res) =>{
  methods.result.getResults()
  .then(re => {
    res.render('result',{title : 'Result',result: re})
  })  
})


module.exports = router;