'use strict';
module.exports = (sequelize, DataTypes) => {
  var Entry = sequelize.define('Entry', {
    name: DataTypes.STRING,
    type: DataTypes.INTEGER,
    value: DataTypes.DOUBLE,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Entry;
};