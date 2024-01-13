require("dotenv").config();
const dbDevelopment = {
  username: "admin",
  password: "Emman0099012",
  database: "myapp",
  host: "localhost",

  dialect: "mysql",
};
const dbProduction = {
  username: "admin",
  password: "Emman0099012",
  database: "myapp",
  host: "database-1.cwixvtlqqegj.eu-north-1.rds.amazonaws.com",
  dialect: "mysql",
};
module.exports = {
  development: dbDevelopment,
  production: dbProduction,
};
