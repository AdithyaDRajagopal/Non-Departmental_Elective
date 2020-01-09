const Promise = require('bluebird');

const models = require('../../models');
// const obtainInformation = require('./obtainInformation');
const departmentMethods = require('../../methods/department') 
const Sequelize = require('sequelize');
var { sequelize } = models;

const studentMethods = {};
const Op = Sequelize.Op;

studentMethods.addStudent = (info,dept) => {
    return new Promise((resolve, reject) => {
      console.log("inside add student")
        var student ={}
        student.id = info.RegID
        student.name = info.Name
        student.email = info.email
        student.cgpa = info.cgpa
        student.deptID = dept
        models.student.create(student)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
  }

studentMethods.getStudentDetails = function(userID){
    console.log("Inside get student ID")
    console.log(userID)
    return new Promise((resolve,reject)=>{
        models.student.findOne({
            where :{
                id : userID
            }
        })
        .then(res=>{
           resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
    
}

studentMethods.getEligibleCourses = (CCE,CNE,choice) =>{
    console.log("Get eligible courses")
    return new Promise((resolve,reject) => {
        var courses = []
        for(var i=0;i<CCE.length;i++){
            courses.push(CCE[i])
        }
        for(var j=0;j<CNE.length;j++){
            courses.push(CNE[j])
        }
        for(var k=0;k<choice.length;k++){
            courses.push(choice[k])
        }
        models.course.findAll({
            where : {
                courseID : {
                    [Op.notIn] : courses
                },
                selected:true
            }
        })
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

studentMethods.addChoice = (sid,cid) => {
    return new Promise((resolve, reject) => {
      console.log("inside add choice")
        var choice ={}
        choice.courseID = cid
        choice.studentID = sid
        models.choice.create(choice)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
  }

studentMethods.deleteChoice = function(sid,cid){
    return new Promise((resolve,reject) => {
      models.choice.destroy({
        raw : true,
        where : {
          studentID : sid,  
          courseID : cid
        }})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
    })
  })
}
  

studentMethods.viewChoice = function(userID){
    console.log("Inside get student ID")
    console.log(userID)
    return new Promise((resolve,reject)=>{
        models.choice.findAll({
            where :{
                studentID : userID
            },
            order : [['priority','ASC']]
        })
        .then(res=>{
           resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    }) 
}

studentMethods.generateRankList = function() { 
    return new Promise((resolve,reject) =>{
        models.student.findAll({
            order : [['cgpa','DESC']]
        })
        .then(res => {
            var students = []
            res.forEach(element => {
                students.push(element.dataValues.id)
            });
            resolve(students)
        })
        .catch(err => {
            reject(err)
        })
    })
}

/*studentMethods.getAllStudentsDesc = function(){
    return new Promise((resolve,reject) =>{
        models.Student.findAll({
            order : [['cgpa','DESC']]
        })
        .then(res => {
            var students = []
            res.forEach(element => {
                students.push(element.dataValues.id)
            });
            resolve(students)
        })
        .catch(err => {
            reject(err)
        })
    })
}

/*
studentMethods.allowedCourses = function(studentID){
    console.log(this)
    return new Promise(function(resolve,reject) {
        models.Student.findOne({
            raw : true,
            where : {
                regID : studentID
            },
            attributes : ['deptID']
        })
        .then(function(res){
            console.log(res)
            var deptID = res.deptID;
            // console.log(method)
            departmentMethods.getCoursesElligibleForDept(deptID)
            .then(re => {
                resolve(re)
            })
            .catch(er => {
                reject(er)
            })
            
        })
        .catch(err => {
            console.log(err)
        })
    })

    // return new Promise((resolve,reject) => {
    //     models.Student.findAll()
    //     .then(res => {
    //         resolve(['C01','C02',"C03"]);
    //     })
    //     .catch()

    // })
}



studentMethods.getAllStudentDetails = function(){
    return new Promise((resolve,reject)=>{
      models.Student.findAll({
        raw : true,
        attributes : ['id','regID','name']
      })
      .then(res => {
        var re = {}
        res.forEach(element => {
          var x = []
          x.push(element.regID)
          x.push(element.name)
          re[element.id] = x
        });
        resolve(re);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
  
*/
module.exports = studentMethods;