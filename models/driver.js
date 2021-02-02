("use strict");
module.exports = (sequelize, DataTypes) => {
  const Drivers = sequelize.define(
    "Drivers",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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
      status: {
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
      registration: { type: DataTypes.STRING },
      model: { type: DataTypes.STRING },
      gender: { type: DataTypes.STRING },
    },
    {}
  );
  return Drivers;
};
