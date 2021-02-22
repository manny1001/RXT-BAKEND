const { Driver, Trips } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET, PORT } = process.env;
class TripsController {
  static async getDriversLocation(uuidUser, uuidTrip) {
    try {
      return await Trips.findAll({
        limit: 1,
        where: {
          uuidTrip,
          uuidUser,
          status: [
            "On-Route,Pickup",
            "Arrived",
            "Confirmed,WaitingDriver",
            "Paid,WaitingDriver",
          ],
        },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getUsersRequestHistory(uuidUser) {
    try {
      const userTrips = await Trips.findAll({
        where: {
          uuidUser,
          status: ["Complete", "Cancelled", "Active"],
        },
      });
      return userTrips;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async createNewTrip(
    uuid,
    name,
    cellphone,
    location,
    destination,
    uuidDriver
  ) {
    try {
      await Trips.create({
        uuidUser: uuid,
        name,
        cellphone,
        location,
        destination,
        uuidDriver,
        status: "Pending Driver",
      });

      await Driver.update(
        {
          status: "Offline",
        },
        {
          where: { uuid: uuidDriver },
        }
      );

      return "Succesfully Requested, Awaiting Driver Response";
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async createNewDriver(driveruuid, useruuid) {
    try {
      await Trips.update(
        {
          uuidDriver: driveruuid,
        },
        {
          where: { uuidUser: useruuid, status: "Pending Driver" },
          order: [["updatedAt", "DESC"]],
        }
      );
      return "Succesfully Re-Requested, Awaiting Driver Response";
    } catch {
      (err) => console.log(err);
    }
  }
  static async PayOrConfirm(uuidTrip, totalAmount, paymentMethod) {
    try {
      await Trips.update(
        {
          totalAmount,
          paymentmethod: paymentMethod,
          status:
            paymentMethod === "Card"
              ? "Paid,WaitingDriver"
              : "Confirmed,WaitingDriver",
          driverduration: "200",
          driverremainingtime: "60",
        },
        { where: { uuidTrip: uuidTrip } }
      );
      return "Success, Awaiting Driver...";
    } catch {
      (err) => console.log(err);
    }
  }
  static async requestResponse(uuidDriver, status, uuidTrip) {
    try {
      await Trips.update(
        {
          status: status,
        },
        {
          where: {
            uuidDriver,
            uuidTrip,
          },
        }
      );
      return "Success";
    } catch {
      (err) => console.log(err);
    }
    s;
  }
  static async getRequestResponse(uuidUser) {
    try {
      const userTrip = await Trips.findAll({
        limit: 1,
        where: {
          uuidUser,
          status: ["Pending Payment"],
        },
        order: [["updatedAt", "DESC"]],
      });

      if (userTrip[0] === undefined) return {};
      return userTrip[0].dataValues;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getCardPaymentResult(uuidTrip, totalAmount) {
    console.log(uuidTrip, totalAmount);
    try {
      return await Trips.findAll({
        limit: 1,
        where: {
          uuidTrip,
          totalAmount,
          paymentMethod: "Card",
          status: ["Paid,WaitingDriver", "Unsuccessful"],
        },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = TripsController;
