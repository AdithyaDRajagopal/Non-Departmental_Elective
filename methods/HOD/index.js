const models = require("../../models");
const Promise = require("bluebird");

var {sequelize} = models

var HODMethods = {}

HODMethods.addHOD = (info) => {
    return new Promise((resolve, reject) => {
        var HOD ={}
        HOD.id = info.username
        HOD.name = info.name
        HOD.deptID = info.deptID
        models.HOD.create(HOD)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
}

HODMethods.getHODs = () => {
  console.log('inside get HOD');
  return new Promise((resolve, reject) => {
    models.HOD.findAll()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

HODMethods.getHODDetails = (userID) => {
  console.log('inside get HODdetails');
  return new Promise((resolve, reject) => {
    models.HOD.findOne({
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

module.exports = HODMethods;