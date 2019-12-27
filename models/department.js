'use strict';
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    Did:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.CHAR(2)
      },  
    Dname: DataTypes.STRING
  }, {});
  department.associate = function(models) {
    // associations can be defined here
    models.department.hasMany(models.advisor,{ foreignKey: 'deptID' })
    models.department.hasMany(models.CNE,{foreignKey: 'dept'})
    department.hasOne(models.HOD,{foreignKey:'deptID'});
  };
  return department;
};