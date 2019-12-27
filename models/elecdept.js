'use strict';
module.exports = (sequelize, DataTypes) => {
  const elecdept = sequelize.define('elecdept', {
    Cid:{
        allowNull: false,
        type: DataTypes.CHAR(5)
      },
    deptID : DataTypes.CHAR(2)
  }, {});
  elecdept.associate = function(models) {
    // associations can be defined here
    models.elecdept.belongsTo(models.prevelec,{foreignKey:'Cid',targetKey:'id'})
    models.elecdept.belongsTo(models.department,{foreignKey:'deptID',targetKey:'Did'})
  };
  return elecdept;
};