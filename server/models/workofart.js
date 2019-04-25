'use strict';
module.exports = (sequelize, DataTypes) => {
  const workOfArt = sequelize.define('workOfArt', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  workOfArt.associate = function(models) {
    // associations can be defined here
  };
  return workOfArt;
};