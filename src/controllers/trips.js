const { Trips } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET, PORT } = process.env;
class TripsController {
  static async getDriversLocation(uuidUser) {
    try {
      return await Trips.findAll({
        limit: 1,
        where: {
          uuidUser,
          status: [
            "On-Route,Pickup",
            "Arrived",
            "Confirmed,WaitingDriver",
            "Paid,WaitingDriver",
          ],
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = TripsController;
