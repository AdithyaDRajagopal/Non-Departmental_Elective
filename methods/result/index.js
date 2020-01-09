const Promise = require('bluebird');

const models = require('../../models');
const Sequelize = require('sequelize');
var { sequelize } = models;

const resultMethods = {};
const Op = Sequelize.Op;

resultMethods.addResult = (info) => {
    return new Promise((resolve, reject) => {
        console.log("inside add elective")
          var result ={}
          result.courseID = info.courseID
          result.studentID = info.studentID 
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


resultMethods.clearResult = () => {
  return new Promise((resolve,reject) => {
    models.result.destroy({
      where : {},
    })
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}

module.exports = resultMethods