var express = require('express')
var app = express()

var methods = require('./methods')

methods.student.generateRankList()
.then(res2 => {
    //Students Arranged in Descending Order in res
    // console.log(res2)
    methods.student.getStudentPreferences(res2)
    .then(res => {
        //[{studentid1: ['cid1','cid2']},{studentid2: ['cid1','cid2']},{studentid3: ['cid1','cid2']}] array returned
        //Students are sorted in cgpa desc
        methods.course.getAllCourses()
        .then(re => {
            //re is an object with key course id and value array[capacity,filled]
            var course_list = re;
            // console.log(res)
            // console.log(course_list)
            var allotment = []
            res.forEach(studObj => {
              //console.log(studObj)
              studentID = Object.keys(studObj)[0]
               courses  =studObj[studentID]
               if(!courses){
                   //student not specified preference
                   // Add such students to an array and finally allot them to any course that is not yet filled
                   console.log(studentID, "not specified any preference")
               }
               else{
                //    console.log(studObj)
                for(var i=0;i<courses.length;i++){
                    var course = courses[i];
                     if(course_list[course][1]<course_list[course][0]){
                         course_list[course][1]++;
                         var stud_allot={}
                         stud_allot['studentID'] = studentID;
                         stud_allot['courseID'] = course;
                         methods.course.getCourse(course)
                         .then(crs => {
                             console.log(crs.dataValues)
                         })
                         allotment.push(stud_allot);
                         break;
                     }
                }
               }
            });
           
           console.log(allotment)
       //   allotmentMethods.bulkCreate(allotment)
       //   .then(res => {

//                 resolve(res)
//            })
//          .catch(err => {
  //           reject(err)
    //      })
        })
        .catch(er =>{
            console.log(er)
       })
        
    })
})
.catch(erro => {
    reject(erro)
})