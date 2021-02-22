require("dotenv").config();
const dbDetails = {
  username: "root",
  password: "Emman0099021345",
  database: "myapp",
  host: "localhost",
  dialect: "mysql",
};
module.exports = {
  development: dbDetails,
  production: dbDetails,
};
