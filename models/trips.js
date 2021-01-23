"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Trips",
    {
      customername: DataTypes.STRING,
      customersurname: DataTypes.STRING,
      customercellphone: DataTypes.STRING,
      customerlocation: DataTypes.STRING,
      customerdestination: DataTypes.STRING,
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
      drivercustomerarrivaltime: DataTypes.STRING,
    },
    {}
  );
  return User;
};
