const Promise = require('bluebird');
const models = require('../../models');
// const obtainInformation = require('./obtainInformation');
const Sequelize = require('sequelize');
var { sequelize } = models;
const HODMethods = require('../../methods/HOD')
const departmentMethods = {};
const Op = Sequelize.Op;

departmentMethods.getDepts = (hoddept) => {
    console.log('inside get depts');
    return new Promise((resolve, reject) => {
      console.log(hoddept)
      models.department.findAll({
       where: {
          Did : {
            [Op.notIn] : hoddept
          }
        },
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
departmentMethods.getAllDepts = () => {
  console.log('inside get depts');
  return new Promise((resolve, reject) => {
    models.department.findAll()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

departmentMethods.getDeptsArray = () => {
  dept = ["MA"]
  return new Promise((resolve, reject) => {
    models.department.findAll({
      where : {
        Did : {
          [Op.notIn] : dept
        }
      }
    })
      .then((result) => {
        var depts = []
        result.forEach(dept => {
          depts.push(dept.dataValues.Did)
        })
        resolve(depts)
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

departmentMethods.getReqDept = function(deptID) {
  console.log('inside get req depts');
  return new Promise((resolve, reject) => {
    models.department.findOne({
      where : {
        Did : deptID
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
}
  /*departmentMethods.getCoursesElligibleForDept = function(deptID) {
    deptid = [];
    deptid[0] = deptID
    return new Promise((resolve,reject) => {
      models.Course.findAll({
        raw : true,
        where : {
          deptID : {
            [Op.notIn]: deptid
          }   
        },
        attributes : ['id','name','courseID','name']
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  }*/
  
  departmentMethods.NotEligible = function(){
    return new Promise((resolve,reject) => {
        models.CNE.findAll()
        .then(res => {
          // console.log(res)
          var pref = {}
          res.forEach(element => {
            if (!(element.dataValues.dept in pref)){
              pref[element.dataValues.dept] = [];
              // pref[element.dataValues.studentID].push(element.dataValues.courseID)
              pref[element.dataValues.dept].push(element.dataValues.CID);
            }
            else
            pref[element.dataValues.dept].push(element.dataValues.CID);
          });
          // var cids = [];
          // res.forEach(element => {
          //   cids[element.dataValues.preferenceLevel - 1] = element.dataValues.courseID;
          // });
         /* preferences = []  
          depts.forEach(department => {
            // preferences[student] = pref[student]
            // console.log(student)
            var studObj = new Object();
            studObj[department] = pref[department]
            preferences.push(studObj)
            // console.log(pref[stude])
          });*/
          resolve(pref)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  module.exports = departmentMethods;