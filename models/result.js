'use strict';
module.exports = (sequelize, DataTypes) => {
  const result = sequelize.define('result', {
    studentID : {
      allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    CID: DataTypes.CHAR(5),
    Cname : DataTypes.STRING,
    Sname : DataTypes.STRING
  }, {});
  result.associate = function(models) {
    // associations can be defined here
  models.result.belongsTo(models.course,{foreignKey:'CID',targetKey:'courseID'})
  models.result.belongsTo(models.student,{foreignKey:'studentID',targetKey:'id'})
  };
  return result;
};