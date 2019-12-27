const Promise = require('bluebird');

const models = require('../../models');
// const obtainInformation = require('./obtainInformation');
const Sequelize = require('sequelize');
var { sequelize } = models;

const advisorMethods = {};
const Op = Sequelize.Op;

advisorMethods.getAdvisorDetails = (userID) => {
  console.log('inside get HODdetails');
  return new Promise((resolve, reject) => {
    models.advisor.findOne({
      where : {
        id : userID
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

advisorMethods.addAdvisor = (info,dept) => {
  return new Promise((resolve, reject) => {
    console.log("inside add advisor")
      var Advisor ={}
      Advisor.id = info.username
      Advisor.name = info.name
      Advisor.deptID = dept
      models.advisor.create(Advisor)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
}
  
  module.exports = advisorMethods;
  //addadvisor