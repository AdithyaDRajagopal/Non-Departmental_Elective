const Promise = require('bluebird');

const models = require('../../models');
// const obtainInformation = require('./obtainInformation');
const Sequelize = require('sequelize');
var { sequelize } = models;

const courseMethods = {};
const Op = Sequelize.Op;

courseMethods.offerCourse = (info) => {
  info.filled = 0;
  return new Promise((resolve, reject) => {
    models.course.findOne({
      where : {
        courseID : info.courseID
      }
    })
      .then((result) => {
        result.update({
          filled : 0,
          selected : true,
          capacity : info.capacity
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

courseMethods.deleteOfferedCourse = (info) => {
  return new Promise((resolve, reject) => {
    models.course.findOne({
      where : {
        courseID : info.courseID
      }
    })
      .then((result) => {
        result.update({
          filled : null,
          selected : false,
          capacity : null
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
/*courseMethods.addCourse = (info) => {
    info.filled = 0;
    return new Promise((resolve, reject) => {
      models.Course.create(info)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

courseMethods.getAllCourses = function(){
  return new Promise((resolve,reject)=>{
    models.Course.findAll({
      raw : true,
      attributes : ['id','capacity','filled']
    })
    .then(res => {
      var re = {}
      res.forEach(element => {
        var x = []
        x.push(element.capacity)
        x.push(element.filled)
        re[element.id] = x
      });
      resolve(re);
    })
    .catch(err => {
      reject(err);
    })
  })
}


courseMethods.getAllCourseDetails = function(){
  return new Promise((resolve,reject)=>{
    models.Course.findAll({
      raw : true,
      attributes : ['id','courseID','name']
    })
    .then(res => {
      var re = {}
      res.forEach(element => {
        var x = []
        x.push(element.courseID)
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


courseMethods.fill = (cid,fill) => {
  fill = fill+1
  return new Promise((resolve, reject) => {
    models.course.findOne({
      where : {
        courseID : cid
      }
    })
      .then((result) => {
        result.update({
          filled : fill
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

courseMethods.unfill = () => {
  return new Promise((resolve, reject) => {
    models.course.findOne({
      where : {
        selected : true
      }
    })
    .then(result => {
      result.update({
        filled : 0
      })
      .then( re => {
        resolve(re);
      })
      .catch( e=>{
        reject(e);
      })
    })
    .catch(error => { 
      console.log(error)
    })
    })
    
}

courseMethods.getOfferedCourses = function(dept){
  return new Promise((resolve,reject) => {
    models.course.findAll({
      where : {
        selected : false,
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

courseMethods.getSelectedCourses = function(dept){
  return new Promise((resolve,reject) => {
    models.course.findAll({
      where : {
        selected : true,
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

courseMethods.getCNEs = function(dept){
  return new Promise((resolve,reject) => {
    models.CNE.findAll({
      where : {
        dept : dept
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

courseMethods.getCCEs = function(elective){
  return new Promise((resolve,reject) => {
    models.CCE.findAll({
      where : {
        elective : {
          [Op.in] : elective
        }
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

courseMethods.getCourse = function(cid){
  return new Promise((resolve,reject) => {
    models.course.findAll({
      where : {
        courseID : cid
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

courseMethods.getCourses = function(){
  return new Promise((resolve,reject) => {
    models.course.findAll({
      raw : true,
      where : {
        selected : true
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

courseMethods.getAllCourses = function(){
  return new Promise((resolve,reject)=>{
    models.course.findAll({
      raw : true,
      attributes : ['id','capacity','filled'],
      where : {
        selected: true
      }
    })
    .then(res => {
      var re = {}
      res.forEach(element => {
        var x = []
        x.push(element.capacity)
        x.push(element.filled)
        re[element.id] = x
      });
      resolve(re);
    })
    .catch(err => {
      reject(err);
    })
  })
}

/*
courseMethods.getCourse = function(id){
  return new Promise((resolve,reject) => {
    models.Course.findOne({
      raw : true,
      where : {
        id : id
      },
      attributes : ['courseID','name']
    })
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}
/*
courseMethods.deleteCourse = function(id){
  return new Promise((resolve,reject) => {
    models.Course.destroy({
      raw : true,
      where : {
        courseID : id
      }})
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}
*/
  module.exports = courseMethods;