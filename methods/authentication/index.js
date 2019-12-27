const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const models = require("../../models");
const Promise = require("bluebird");
const key = require("../../config/api.json").API_SECRET;
const { sequelize } = require("../../models");
var authenticationMethods = {};

authenticationMethods.registerAdmin = function(info) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(info.password, saltRounds).then(hash=>{
      return sequelize
      .transaction(function(t) {
        var user = {}
       user.username = info.username
       user.password = hash
       user.type = 1
      //  console.log(hash)
        return models.user
          .create(user, { transaction: t })
          .then(function(user) {
          // console.log(user)
           
          })
          .catch(function(err) {
            reject({ success: err });
          });
      })
      .then(function(result) {
        console.log("SUCCESS")
        resolve({ success: true });
      })
      .catch(function(err) {
        reject({ success: "false3" });
      });
    })
    .catch(err=>{
      reject({success : "false4"});
    })
  });
};

authenticationMethods.registerHOD = function(info) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(info.password, saltRounds).then(hash=>{
      return sequelize
      .transaction(function(t) {
        var user = {}
       user.username = info.username
       user.password = hash
       user.type = 2
      //  console.log(hash)
        return models.user
          .create(user, { transaction: t })
          .then(function(user) {
          // console.log(user)
           
          })
          .catch(function(err) {
            reject({ success: err });
          });
      })
      .then(function(result) {
        console.log("SUCCESS")
        resolve({ success: true });
      })
      .catch(function(err) {
        reject({ success: "false3" });
      });
    })
    .catch(err=>{
      reject({success : "false4"});
    })
  });
};

authenticationMethods.registerAdvisor = function(info) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(info.password, saltRounds).then(hash=>{
      return sequelize
      .transaction(function(t) {
        var user = {}
       user.username = info.username
       user.password = hash
       user.type = 3
      //  console.log(hash)
        return models.user
          .create(user, { transaction: t })
          .then(function(user) {
          // console.log(user)
           
          })
          .catch(function(err) {
            reject({ success: err });
          });
      })
      .then(function(result) {
        console.log("SUCCESS")
        resolve({ success: true });
      })
      .catch(function(err) {
        reject({ success: "false3" });
      });
    })
    .catch(err=>{
      reject({success : "false4"});
    })
  });
};

authenticationMethods.registerStudent = function(info) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(info.password, saltRounds).then(hash=>{
      return sequelize
      .transaction(function(t) {
        var user = {}
       user.username = info.username
       user.password = hash
       user.type = 4
      //  console.log(hash)
        return models.user
          .create(user, { transaction: t })
          .then(function(user) {
          // console.log(user)
           
          })
          .catch(function(err) {
            reject({ success: err });
          });
      })
      .then(function(result) {
        console.log("SUCCESS")
        resolve({ success: true });
      })
      .catch(function(err) {
        reject({ success: "false3" });
      });
    })
    .catch(err=>{
      reject({success : "false4"});
    })
  });
};


authenticationMethods.authenticateUser = function(username, password) {
  return new Promise(function(resolve, reject) {
    models.user
      .findOne({
        where: {
          username: username
        }
      })
      .then(result => {
        if (result) {
          // console.log(result)
          bcrypt.compare(password, result.password, function(err, res) {
            if (res === true) {
              console.log("correct password-bcrypt");
              const token = jwt.sign(
                {
                  id: result.username,
                  type: result.dataValues.type,
                },
                key,
                { expiresIn: "1h" }
              );
              const type = result.dataValues.type;
              const user_id = result.dataValues.username;
              var decoded = jwt.decode(token, { complete: true });
              console.log(user_id + " " + type);
              
              resolve({
                success: true,
                token: token,
                type: type,
                user_id: user_id
              });
            } else {
              console.log("wrong password-bcrypt");

              reject({ success: false, token: null });
            }
          });
        } else {
          reject(new Error());
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = authenticationMethods;