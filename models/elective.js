'use strict';
module.exports = (sequelize, DataTypes) => {
  const elective = sequelize.define('elective', {
    electiveID : DataTypes.CHAR(5)
  }, {});
  elective.associate = function(models) {
    // associations can be defined here
  models.elective.belongsTo(models.prevelec,{foreignKey:'electiveID', targetKey:'id'})
  };
  return elective;
};