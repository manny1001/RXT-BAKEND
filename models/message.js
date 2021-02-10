("use strict");
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      _id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING,
      },
      /*   createdAt: {
        type: DataTypes.STRING,
      }, */
      image: {
        type: DataTypes.STRING,
      },
      video: {
        type: DataTypes.STRING,
      },
      uuidDriver: {
        type: DataTypes.STRING,
      },
      uuidUser: {
        type: DataTypes.STRING,
      },
      uuidtrip: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  return Message;
};
