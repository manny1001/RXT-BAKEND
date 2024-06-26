"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trips = sequelize.define(
    "Trips",
    {
      uuidTrip: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      uuidUser: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      location: DataTypes.STRING,
      destination: DataTypes.STRING,
      totalAmount: DataTypes.STRING,
      tip: DataTypes.STRING,
      paymentmethod: DataTypes.STRING,
      status: DataTypes.STRING,
      rating: DataTypes.STRING,
      /* urgency: DataTypes.STRING, */
      driversLiveLocation: DataTypes.STRING,
      drivername: DataTypes.STRING,
      uuidDriver: DataTypes.STRING,
      driversCellphone: DataTypes.STRING,
      driverImage: DataTypes.STRING,
      driversurname: DataTypes.STRING,
      driverregistration: DataTypes.STRING,
      model: DataTypes.STRING,
      driverduration: DataTypes.STRING,
      driverremainingtime: DataTypes.STRING,
      drivercustomerarrivaltime: DataTypes.STRING,
    },
    { freezeTableName: true }
  );
  return Trips;
};
