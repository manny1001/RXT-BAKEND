module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    "Driver",
    {
      _id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
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
      /*      customers: { type: DataTypes.STRING }, */
    },
    {}
  );
  Driver.find = async function ({ _id = null }) {
    const driver = await Driver.findOne({
      where: {
        _id,
      },
    });

    return driver;
  };

  Driver.createUserIfNotExists = async function ({ cellphone }) {
    const [driver, created] = await Driver.findOrCreate({
      where: { cellphone },
    });

    return [driver, created];
  };

  return Driver;
};
