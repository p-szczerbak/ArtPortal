'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkOfArt = sequelize.define('WorkOfArt', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    author: DataTypes.STRING
  }, {});
  WorkOfArt.associate = function(models) {
    // associations can be defined here
  };
  return WorkOfArt;
};
