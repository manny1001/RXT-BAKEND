const { User } = require("../models");

class UserController {
  static async getAllUsers({ cellphone, type }) {
    console.log(cellphone, type);
    /*   const CurrentUser = await User.findOne({ where: { cellphone } });
    console.log(CurrentUser);
    return CurrentUser; */
  }

  static async getUserById(userId) {
    return await User.find({ _id: userId });
  }

  /*  static async updateUser(user, username) {
    await user.update({
      username,
    });
  } */
}

module.exports = UserController;
