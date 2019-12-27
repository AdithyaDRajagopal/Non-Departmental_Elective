'use strict';
module.exports = (sequelize, DataTypes) => {
  const result = sequelize.define('result', {
    CID: DataTypes.CHAR(5)
  }, {});
  result.associate = function(models) {
    // associations can be defined here
  models.result.belongsTo(models.course,{foreignKey:'CID',targetKey:'courseID'})
  };
  return result;
};