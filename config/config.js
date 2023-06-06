require("dotenv").config();
const dbDetails = {
  username: "admin",
  password: "#Manny3000",
  database: "myapp",
  host: "database-1.cwixvtlqqegj.eu-north-1.rds.amazonaws.com",
  dialect: "mysql",
};
module.exports = {
  development: dbDetails,
  production: dbDetails,
};


