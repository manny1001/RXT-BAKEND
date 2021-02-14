const { Driver } = require("../models");

class DriverController {
  static async getAllDrivers({ cellphone, type }) {
    console.log(cellphone, type);
  }

  static async getDriverById(driverId) {
    return await Driver.find({ _id: driverId });
  }
}

module.exports = DriverController;
