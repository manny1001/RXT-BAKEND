const { Message, User, Driver } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET, PORT } = process.env;
class MessageController {
  static async(uuidtrip, uuid) {}
  static async getUserMessage() {
    try {
      const user = await User.findAll({
        limit: 1,
        where: {
          uuid: Message.dataValues.uuid,
        },
      });
      const driver = await Driver.findAll({
        limit: 1,
        where: {
          uuid: Message.dataValues.uuid,
        },
      });

      return [
        {
          ...(user && user[0] && user[0].dataValues),
          ...(driver && driver[0] && driver[0].dataValues),
        },
      ];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = MessageController;
