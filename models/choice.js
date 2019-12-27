'use strict';
module.exports = (sequelize, DataTypes) => {
  const choice = sequelize.define('choice', {
    priority: {
      primaryKey : true,
      autoIncrement : true,
      type : DataTypes.INTEGER},
    courseID:{
        allowNull: false,
        type: DataTypes.CHAR(5)
      },
  }, {});
  choice.associate = function(models) {
    // associations can be defined here
  models.choice.belongsTo(models.course,{foreignKey:'courseID',targetKey:'courseID'})
  };
  return choice;
};