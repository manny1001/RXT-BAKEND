"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Trips",
    {
      username: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      location: DataTypes.STRING,
      destination: DataTypes.STRING,
      total: DataTypes.STRING,
      tip: DataTypes.STRING,
      paymentmethod: DataTypes.STRING,
      status: DataTypes.STRING,
      rating: DataTypes.STRING,
      drivername: DataTypes.STRING,
      driversurname: DataTypes.STRING,
      driverregistration: DataTypes.STRING,
      model: DataTypes.STRING,
      driverresponsetime: DataTypes.STRING,
      driverarrivaltime: DataTypes.STRING,
      drivercustomerarrivaltime: DataTypes.STRING,
    },
    {}
  );
  return User;
};
