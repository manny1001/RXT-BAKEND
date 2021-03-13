const { Driver, Trips, User } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET, PORT } = process.env;
const Sequelize = require("sequelize");
const op = Sequelize.Op;
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
    uuidDriver,
    urgency
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
        urgency,
      });
      const mostRecentRequest = await Trips.findOne({
        where: {
          uuidUser: uuid,
          name,
          cellphone,
          location,
          destination,
          uuidDriver,
          status: "Pending Driver",
          createdAt: {
            [op.gt]: new Date(Date.now() - 1000),
          },
        },
      });
      await Driver.update(
        {
          status: "Offline",
        },
        {
          where: { uuid: uuidDriver },
        }
      );
      console.log(mostRecentRequest);
      return mostRecentRequest && mostRecentRequest.dataValues.uuidTrip;
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
          drivername: "Manfred",
          driversurname: "Mann",
          driverregistration: "CX 01 BC GP",
          model: "Hyundai",
          status:
            paymentMethod === "Card"
              ? "Paid,WaitingDriver"
              : "Confirmed,WaitingDriver",
          driverduration: "200",
          driverremainingtime: "60",
          driverImage:
            "https://firebasestorage.googleapis.com/v0/b/shop4-962e4.appspot.com/o/PicsArt_09-23-03.38.25.jpg?alt=media&token=ccd69fd1-d2bc-43f3-b788-63b7ce56d2b8",
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
  static async getRequestResponse(uuidUser, uuidTrip) {
    try {
      const userTrip = await Trips.findAll({
        limit: 1,
        where: {
          uuidTrip,
          uuidUser,
          status: ["Pending Payment", "Confirmed,WaitingDriver"],
          /* createdAt: {
            [op.gt]: new Date(Date.now() - 1500),
          }, */
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

  static async createPersonalDriver(driveruuid, customerUUID) {
    await Driver.update(
      {
        customers: Sequelize.fn(
          "CONCAT",
          Sequelize.col("customers"),
          JSON.stringify(customerUUID)
        ),
      },
      {
        where: {
          uuid: driveruuid,
        },
      }
    );
    return "Successfully created personal driver";
  }
  static async getcurrentRequest(uuidDriver) {
    try {
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
      console.log(currentRequest);
      return currentRequest;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = TripsController;
