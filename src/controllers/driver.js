const { Driver } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET, PORT } = process.env;
class DriverController {
  static async driverLogin({ cellphone, type }) {
    const driver = await Driver.findOne({
      where: { cellphone },
    });

    if (driver !== null) {
      try {
        const token = jsonwebtoken.sign(
          { id: driver.dataValues._id, type },
          JWT_SECRET,
          {
            expiresIn: "3d",
          }
        );
        return {
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
    if (driver === null) {
      try {
        const driver = await Driver.create({
          cellphone,
        });
        const token = jsonwebtoken.sign(
          { id: driver.dataValues._id, type: "driver" },
          JWT_SECRET,
          {
            expiresIn: "3d",
          }
        );
        return {
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
    return driver;
  }
  static async getOnlineDrivers() {
    try {
      return Driver.findAll({
        where: {
          status: ["Online"],
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getDriverById(driverId) {
    return await Driver.find({ _id: driverId });
  }
  static async updateStatus(driveruuid, status) {
    console.log(driveruuid, status);
    try {
      await Driver.update(
        {
          status,
        },
        {
          where: { uuid: driveruuid },
        }
      );
      return "Succesfully updated";
    } catch {
      (err) => console.log(err);
    }
  }
}

module.exports = DriverController;
