require("dotenv").config();
const dbDetails = {
  host: "driven.cixopu6bar8u.us-east-2.rds.amazonaws.com",
  port: "1506",
  dialect: "mysql",
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000,
  },
  define: {
    timestamps: true,
    freezeTableName: true,
  },
};
module.exports = {
  development: dbDetails,
  production: dbDetails,
};
