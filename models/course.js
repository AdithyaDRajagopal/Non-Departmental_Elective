
'use strict';
module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    courseID:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.CHAR(5)
      },
    name: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    filled: DataTypes.INTEGER,
    selected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false }
  }, {});
  course.associate = function(models) {
    // associations can be defined here
  models.course.belongsTo(models.department,{foreignKey:'deptID'})

  };
  return course;
};