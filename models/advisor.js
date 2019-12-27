'use strict';
module.exports = (sequelize, DataTypes) => {
  const advisor = sequelize.define('advisor', {
    id:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    name: DataTypes.STRING,
  }, {});
  advisor.associate = function(models) {
    // associations can be defined here
  models.advisor.belongsTo(models.user,{foreignKey:'id',targetKey:'username'})
  models.advisor.hasMany(models.student,{foreignKey:'advisorID'})
  };
  return advisor;
};