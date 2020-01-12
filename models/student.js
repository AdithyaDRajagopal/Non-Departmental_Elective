'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    id:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        }
      }
    },
    cgpa : DataTypes.REAL,
    noc : {
       type: DataTypes.INTEGER,
       defaultValue: 0 }
  }, {});
  student.associate = function(models) {
    // associations can be defined here
  models.student.belongsTo(models.department,{foreignKey:'deptID'})
  models.student.hasMany(models.choice,{ foreignKey: 'studentID' })
  models.student.hasMany(models.elective,{foreignKey: 'studentID'})
  };
  return student;
};