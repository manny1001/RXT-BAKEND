module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
    { freezeTableName: true }
  );
  User.find = async function ({ _id = null }) {
    const user = await User.findOne({
      where: {
        _id,
      },
    });

    return user;
  };

  User.createUserIfNotExists = async function ({ cellphone }) {
    const [user, created] = await User.findOrCreate({
      where: { cellphone },
    });

    return [user, created];
  };

  return User;
};
