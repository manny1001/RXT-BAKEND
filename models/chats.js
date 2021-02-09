("use strict");
module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define(
    "Chats",
    {
      _id: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  return Chats;
};
