'use strict';
module.exports = (sequelize, DataTypes) => {
  const CCE = sequelize.define('CCE', {
    CID: DataTypes.CHAR(5),  
    elective: DataTypes.CHAR(5)
  }, {});
  CCE.associate = function(models) {
    // associations can be defined here
    models.CCE.belongsTo(models.course,{foreignKey:'CID',targetKey:'courseID'})
    models.CCE.belongsTo(models.prevelec,{foreignKey:'elective',targetKey:'id'})
  };
  return CCE;
};