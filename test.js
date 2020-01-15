var express = require('express')
var app = express()

var methods = require('./methods')
    
methods.course.getAllCourses()
.then(re => {
  var course_list =re;
  methods.department.NotEligible()
  .then(NE => {
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
        methods.student.RemainingStudents(studid)
        .then(r2 => {
            var allotment = []
            r2.forEach(student => {
                methods.student.getStudentDetails(student)
                .then(r3 => {
                    methods.course.RemainingCourses(NE[r3.dataValues.deptID])
                    .then(courses => {
                        if(!courses){
                            //student not specified preference
                            // Add such students to an array and finally allot them to any course that is not yet filled
                            console.log(studentID, "not alloted")
                        }
                        else{
                            var min = 70;
                            var course;
                            for(var i=0;i<courses.length;i++){
                                if(min>course_list[courses[i]][1]){
                                    min = course_list[courses[i]][1]
                                    course = courses[i]
                                }
                            }
                         //    console.log(studObj)
                              if(course_list[course][1]<course_list[course][0]){
                                  course_list[course][1]++;
                                  var stud_allot={}
                                  stud_allot['studentID'] = student;
                                  stud_allot['courseID'] = course;
                                  allotment.push(stud_allot);
                                  break;
                              }
                        }
                        methods.result.addResult(allotment[allotment.length - 1])
                    })
                })
            });
        })
    })
    .catch(err => {
        console.log(err)
    })
  })
})
