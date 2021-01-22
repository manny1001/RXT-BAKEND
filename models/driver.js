("use strict");
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    "driver",
    {
      name: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
      cellphone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      homeaddress: {
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
  return Driver;
};
