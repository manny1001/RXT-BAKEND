module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define(
    "Checkout",
    {
      _id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      payment_method_types: {
        type: DataTypes.STRING,
      },
      currency: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.STRING,
      },
      unit_amount: {
        type: DataTypes.STRING,
      },
      mode: {
        type: DataTypes.STRING,
      },
      success_url: {
        type: DataTypes.STRING,
      },
      cancel_url: {
        type: DataTypes.STRING,
      },
    },
    { freezeTableName: true }
  );

  return Checkout;
};
