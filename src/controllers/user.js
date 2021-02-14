const { User } = require("../models");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET, PORT } = process.env;
class UserController {
  static async userLogin({ cellphone, type }) {
    const user = await User.findOne({ where: { cellphone } });

    if (user !== null) {
      try {
        const token = jsonwebtoken.sign(
          { id: user.dataValues._id, type },
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
    if (user === null) {
      try {
        const user = await User.create({
          cellphone,
        });
        const token = jsonwebtoken.sign(
          { id: user.dataValues._id, type: "user" },
          process.env.JWT_SECRET,
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
    return user;
  }
  static async getUserById(userId) {
    return await User.find({ _id: userId });
  }
  static async updateProfile(
    uuidUser,
    name,
    email,
    cellphone,
    homeaddress,
    workaddress
  ) {
    try {
      await User.update(
        {
          name,
          email,
          cellphone,
          homeaddress,
          workaddress,
        },
        {
          where: { uuid: uuidUser },
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserController;
