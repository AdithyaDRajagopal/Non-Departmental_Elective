const express = require('express')
const router = express.Router()

const methods = require('../../methods')

router.get("/dashboard", (req,res,next) => {
    methods.student.getStudentDetails(req.decoded.id)
    .then(result => {
         var sid = result.dataValues.id
         var dept = result.dataValues.deptID
         methods.course.getCNEs(dept)
         .then(re1 => {
            var dic = {"CNEs":re1}
            let CNEs = []
            for (let i=0; i<dic["CNEs"].length; i+=1) {
            CNEs.push(dic["CNEs"][i].dataValues);
            }
            let CNE = []
            for(let i=0;i<CNEs.length;i++){
              CNE.push(CNEs[i].CID)
            }  
           methods.elective.getStudentElectives(sid)
           .then(re2 => {
            console.log(sid)
               var dic2 = {"elec":re2}
               let elec = []
               for(let i=0;i<dic2["elec"].length;i++){
                   elec.push(dic2["elec"][i].dataValues)
               }
            console.log(elec)
               let elective = []
               for(let i=0;i<elec.length;i++){
                   elective.push(elec[i].electiveID)
               }
               console.log(elective)
               methods.course.getCCEs(elective)
               .then(re3 => {
                var dic3 = {"CCEs":re3}
            let CCEs = []
            for (let i=0; i<dic3["CCEs"].length; i+=1) {
            CCEs.push(dic3["CCEs"][i].dataValues);
            }
            let CCE = []
            for(let i=0;i<CCEs.length;i++){
              CCE.push(CCEs[i].CID)
            }  
            console.log(CCE)
                   methods.student.viewChoice(sid)
                    .then(re4 => {
                        var dic4 = {"Choice":re4}
                        let Choice = []
                        for (let i=0; i<dic4["Choice"].length; i+=1) {
                        Choice.push(dic4["Choice"][i].dataValues);
                        }   
                        let choice = []
                        for(let i=0;i<Choice.length;i++){
                         choice.push(Choice[i].courseID)
                        }  
                        methods.student.getEligibleCourses(CCE,CNE,choice)
                        .then(re => {
                            methods.course.getCourses()
                            .then(re5 => {
                                methods.result.getResultStudent(sid)
                                .then(re6 => {
                                    res.render('student', {title : 'Student Dashboard',data :re,choice: re4,course:re5,result:re6});
                                })
                            })
                        })
            })
        })
           })
            
         })
         .catch(err => {
             console.log(err)
         })
    })
    .catch(er => {
        console.log(er)
       })
})     

router.post("/selectCourse",(req,res) => {
    methods.student.getStudentDetails(req.decoded.id)
    .then(rest => {
        var sid = rest.dataValues.id
        var cid = req.body.courseID
        var noc = rest.dataValues.noc
        methods.student.addChoice(sid,cid)
        .then(result => {
            console.log(result)
            noc = noc+1
            methods.student.modifyNoc(sid,noc)
            .then(re=> {
                res.redirect("/student/dashboard")
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/deleteCourse",(req,res) => {
    methods.student.getStudentDetails(req.decoded.id)
    .then(rest => {
        var sid = rest.dataValues.id
        var cid = req.body.courseID
        var noc = rest.dataValues.noc
        methods.student.deleteChoice(sid,cid)
        .then(result => {
            console.log(result)
            noc = noc-1
            methods.student.modifyNoc(sid,noc)
            .then(re => {
                res.redirect("/student/dashboard")
            })   
        })
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router;