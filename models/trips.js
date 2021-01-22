'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Trips.init({
    customername: DataTypes.STRING,
    customersurname: DataTypes.STRING,
    customercellphone: DataTypes.STRING,
    customerlocation: DataTypes.STRING,
    customerdestination: DataTypes.STRING,
    timerequested: DataTypes.STRING,
    total: DataTypes.STRING,
    fee: DataTypes.STRING,
    tip: DataTypes.STRING,
    status: DataTypes.STRING,
    rating: DataTypes.STRING,
    drivername: DataTypes.STRING,
    driversurname: DataTypes.STRING,
    driverregistration: DataTypes.STRING,
    carmodel: DataTypes.STRING,
    driverresponsetime: DataTypes.STRING,
    driverarrivaltime: DataTypes.STRING,
    drivercustomerarrivaltime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trips',
  });
  return Trips;
};