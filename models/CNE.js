'use strict';
module.exports = (sequelize, DataTypes) => {
  const CNE = sequelize.define('CNE', {
    CID : DataTypes.CHAR(5)
  }, {});
  CNE.associate = function(models) {
    // associations can be defined here
  models.CNE.belongsTo(models.course,{foreignKey:'CID',targetKey:'courseID'})
  };
  return CNE;
};