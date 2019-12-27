const models = require("../../models");
const Promise = require("bluebird");

var {sequelize} = models

var filltableMethods = {}

filltableMethods.addDept = (did,dname) => {
    return new Promise((resolve, reject) => {
        var dept ={}
        dept.Did = did
        dept.Dname = dname
        models.department.create(dept)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
}

filltableMethods.addElective = (id,name) => {
    return new Promise((resolve, reject) => {
        var prevelec = {}
        prevelec.id = id
        prevelec.name = name
        models.prevelec.create(prevelec)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
}

filltableMethods.linkElective = (id,dept) => {
  return new Promise((resolve, reject) => {
      var prevelec = {}
      prevelec.Cid = id
      prevelec.deptID = dept
      models.elecdept.create(prevelec)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
}

filltableMethods.addCourse = (id,name,dept) => {
    return new Promise((resolve, reject) => {
        var course ={}
        course.courseID = id
        course.name = name
        course.deptID = dept
        models.course.create(course)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
}

filltableMethods.addCNE = (cid,dept) => {
    return new Promise((resolve, reject) => {
        var CNE ={}
        CNE.CID = cid
        CNE.dept = dept
        models.CNE.create(CNE)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
}

filltableMethods.addCCE = (cid,elec) => {
    return new Promise((resolve, reject) => {
        var CCE ={}
        CCE.CID = cid
        CCE.elective = elec
        models.CCE.create(CCE)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
}


module.exports = filltableMethods;