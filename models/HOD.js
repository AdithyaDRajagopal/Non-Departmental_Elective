'use strict';
module.exports = (sequelize, DataTypes) => {
  const HOD = sequelize.define('HOD', {
    id:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },  
    name: DataTypes.STRING,
  }, {});
  HOD.associate = function(models) {
    // associations can be defined here
  models.HOD.belongsTo(models.user,{foreignKey:'id',targetKey:'username'})
  };
  return HOD;
};