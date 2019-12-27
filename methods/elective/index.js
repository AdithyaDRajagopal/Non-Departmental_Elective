const Promise = require('bluebird');

const models = require('../../models');
const Sequelize = require('sequelize');
var { sequelize } = models;

const electiveMethods = {};
const Op = Sequelize.Op;

electiveMethods.getElecDept = function(dept){
    return new Promise((resolve,reject) => {
      models.elecdept.findAll({
        where : {
          deptID : dept
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
 
electiveMethods.addElective = (info,cid) => {
  return new Promise((resolve, reject) => {
    console.log("inside add elective")
      var elective ={}
      elective.studentID = info.username
      elective.electiveID = cid
      models.elective.create(elective)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
}

electiveMethods.getStudentElectives = function(SID){
  return new Promise((resolve,reject) => {
    models.elective.findAll({
      where : {
        studentID : SID
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

module.exports = electiveMethods