require("dotenv").config();
const dbDetails = {
  username: "root",
  password: "Emman009902134",
  database: "myapp",
  host: "localhost",
  dialect: "mysql",
};
module.exports = {
  development: dbDetails,
  production: dbDetails,
};
