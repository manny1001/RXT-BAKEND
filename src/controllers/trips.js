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
  static async getRequestResponse(uuidUser) {
    try {
      const userTrip = await Trips.findAll({
        limit: 1,
        where: {
          uuidUser,
          status: ["Pending Payment", "Cancelled"],
        },
        order: [["createdAt", "DESC"]],
      });

      if (userTrip[0] === undefined) return {};
      return userTrip[0].dataValues;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getHistory(uuidUser) {
    const userTrips = await Trips.findAll({
      where: {
        uuidUser,
        status: ["Complete", "Cancelled", "Active"],
      },
    });
    return userTrips;
  }
  catch(error) {
    throw new Error(error.message);
  }

  static async getRequest(uuidDriver) {
    const currentRequest = await Trips.findAll({
      limit: 1,
      where: {
        uuidDriver,
        status: [
          "Pending Driver",
          "Pending Payment",
          "Paid,WaitingDriver",
          "On-Route,Pickup",
          "Confirmed,WaitingDriver",
        ],
      },
    });
    return currentRequest;
  }
  catch(error) {
    throw new Error(error.message);
  }
}

module.exports = TripsController;
