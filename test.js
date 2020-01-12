var express = require('express')
var app = express()

var methods = require('./methods')

methods.result.getResults()
.then( r1 => {
    var d = {"result":r1}
    let result = []
    for (let i=0; i<d["result"].length; i+=1) {
        result.push(d["result"][i].dataValues);
    }
    let studid = []
    for(let i=0;i<result.length;i++){
        studid.push(result[i].studentID)
    }  
    methods.course.getAllCourses()
          .then(r2 => {
              course_list =r2
            methods.student.RemainingStudents(studid)
            .then(r3 => {
                for(var k=0;k<r3.length;k++){
                    methods.student.getStudentDetails(r3[k])
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
                                        var course[studentID]
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
                }
            })
          })
})






 /*  for(var i=0;i<courses.length;i++){
    var course = courses[i];
     if(course_list[course][1]<course_list[course][0]){
         course_list[course][1]++;
         var stud_allot={}
         stud_allot['studentID'] = studentID;
         stud_allot['courseID'] = course;
         allotment.push(stud_allot);
         break;
     }
}*/