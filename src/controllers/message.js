const { Message, User, Driver } = require("../models/");
require("dotenv").config();
class MessageController {
  static async getMessages(uuidtrip, uuid) {
    console.log(uuidtrip, uuid, "hehehehe");

    try {
      const currentMessage = await Message.findAll({
        where: {
          uuidtrip,
        },
      });

      return currentMessage;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getUserMessage(Message) {
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

      return {
        ...(user && user[0] && user[0].dataValues),
        ...(driver && driver[0] && driver[0].dataValues),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async postMessage(text, image, video, uuid, uuidtrip) {
    try {
      await Message.create({
        text,
        image,
        video,
        uuid: uuid,
        uuidtrip: uuidtrip,
      });
      return "Message Sent";
    } catch (error) {
      throw new Error(error.message);
    }
    s;
  }
}

module.exports = MessageController;
