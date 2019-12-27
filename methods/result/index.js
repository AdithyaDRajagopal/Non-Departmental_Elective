const Promise = require('bluebird');

const models = require('../../models');
const Sequelize = require('sequelize');
var { sequelize } = models;

const resultMethods = {};
const Op = Sequelize.Op;

resultMethods.addResult = (cid,sid,cname,sname) => {
    return new Promise((resolve, reject) => {
        console.log("inside add elective")
          var result ={}
          result.CID = cid
          result.studentID = sid 
          result.Cname = cname
          result.Sname = sname
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
    console.log('inside get result');
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

  resultMethods.getResultCourse = (cid) => {
    console.log('inside get result');
    return new Promise((resolve, reject) => {
      models.result.findAll({
        where : {
          courseID : cid
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

resultMethods.getResultStudent = (sid) => {
  console.log('inside get result');
  return new Promise((resolve, reject) => {
    models.result.findAll({
        where : {
          studentID : sid
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

  resultMethods.getDepartmentResult = (student) => {
    console.log('inside get result');
    return new Promise((resolve, reject) => {
      models.result.findAll({
        where : {
          studentID : {
            [Op.in] : student
          }
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


module.exports = resultMethods