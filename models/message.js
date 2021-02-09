("use strict");
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      _id: {
        type: DataTypes.INTEGER,
      },
      text: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      video: {
        type: DataTypes.STRING,
      },
      uuid: {
        type: DataTypes.STRING,
      },
      uuid: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  return Message;
};
