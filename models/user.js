"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      otp: {
        type: DataTypes.STRING,
      },
      cellphone: {
        type: DataTypes.STRING,
      },
      homeaddress: {
        type: DataTypes.STRING,
      },
      workaddress: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.STRING,
      },
      acceptedtcs: {
        type: DataTypes.STRING,
      },
      totalrequests: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  return User;
};
