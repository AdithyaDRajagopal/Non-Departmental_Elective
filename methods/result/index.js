const Promise = require('bluebird');

const models = require('../../models');
const Sequelize = require('sequelize');
var { sequelize } = models;

const resultMethods = {};
const Op = Sequelize.Op;

resultMethods.addResult = (cid,sid) => {
    return new Promise((resolve, reject) => {
        console.log("inside add elective")
          var result ={}
          result.CID = cid
          result.studentID = sid 
          models.result.create(result)
            .then((result) => {
              resolve(result);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
}

resultMethods.getResults = () => {
    console.log('inside get depts');
    return new Promise((resolve, reject) => {
      models.result.findAll()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

module.exports = resultMethods