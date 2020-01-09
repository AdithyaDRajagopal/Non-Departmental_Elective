'use strict';
module.exports = (sequelize, DataTypes) => {
  const result = sequelize.define('result', {
    studentID : {
      allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
    },
    courseID: DataTypes.CHAR(5),
  }, {});
  result.associate = function(models) {
    // associations can be defined here
  models.result.belongsTo(models.course,{foreignKey:'courseID',targetKey:'courseID'})
  models.result.belongsTo(models.student,{foreignKey:'studentID',targetKey:'id'})
  };
  return result;
};