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

 studentMethods.getAllStudents = () => {
    console.log('inside get all students');
    return new Promise((resolve, reject) => {
      models.student.findAll()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  studentMethods.getAllStudentsDept = (dept) => {
    console.log('inside get all students');
    return new Promise((resolve, reject) => {
      models.student.findAll({
        where : {
          deptID : dept
        }
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };


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
            order : [['cgpa','DESC'],['updatedAt','ASC']]
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

studentMethods.getStudentPreferences = function(studentID){
    return new Promise((resolve,reject) => {
        models.choice.findAll()
        .then(res => {
          // console.log(res)
          var pref = {}
          res.forEach(element => {
            if (!(element.dataValues.studentID in pref)){
              pref[element.dataValues.studentID] = [];
              // pref[element.dataValues.studentID].push(element.dataValues.courseID)
              pref[element.dataValues.studentID].push(element.dataValues.courseID);
            }
            else
            pref[element.dataValues.studentID].push(element.dataValues.courseID);
          });
          // var cids = [];
          // res.forEach(element => {
          //   cids[element.dataValues.preferenceLevel - 1] = element.dataValues.courseID;
          // });
          preferences = []  
          studentID.forEach(student => {
            // preferences[student] = pref[student]
            // console.log(student)
            var studObj = new Object();
            studObj[student] = pref[student]
            preferences.push(studObj)
            // console.log(pref[stude])
          });
          resolve(preferences)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

studentMethods.modifyNoc = (sid,noc) => {
  return new Promise((resolve, reject) => {
    models.student.findOne({
      where : {
        id : sid
      }
    })
    .then((result) => {
        result.update({
          noc : noc
        })
        .then( re => {
          resolve(re);
        })
        .catch( e=>{
          reject(e);
        })
    })
    .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

module.exports = studentMethods;