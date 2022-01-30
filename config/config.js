require("dotenv").config();
const dbDetails = {
  username: "root",
  password: "Emman0099012",
  database: "myapp",
  host: "localhost",
  dialect: "mysql",
};
module.exports = {
  development: dbDetails,
  production: dbDetails,
};
