'use strict';
module.exports = (sequelize, DataTypes) => {
  const prevelec = sequelize.define('prevelec', {
    id:{
        allowNull: false,
        primaryKey:true,
        type: DataTypes.CHAR(5)
      },
    name : DataTypes.STRING 
  }, {});
  prevelec.associate = function(models) {
    // associations can be defined here

  };
  return prevelec;
};