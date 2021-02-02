"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Trips",
    {
      uuidTrip: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: DataTypes.STRING,
      uuidUser: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      location: DataTypes.STRING,
      destination: DataTypes.STRING,
      totalAmount: DataTypes.STRING,
      tip: DataTypes.STRING,
      paymentmethod: DataTypes.STRING,
      status: DataTypes.STRING,
      rating: DataTypes.STRING,
      drivername: DataTypes.STRING,
      uuidDriver: DataTypes.STRING,
      driversLiveLocation: DataTypes.STRING,
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
