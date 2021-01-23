const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();
const resolvers = {
  Query: {
    async currentUser(_, args, { user }) {
      if (!user) throw new Error("You are not authenticated");
      return await models.User.findByPk(user.id);
    },
    async user(root, { id }, { user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.User.findByPk(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async allUsers(root, args, { user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.User.findAll();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    async login(_, { cellphone }) {
      try {
        const user = await models.User.create({
          cellphone,
        });
        const token = jsonwebtoken.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "10" }
        );
        return {
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async newTripRequest(
      root,
      {
        customername,
        customersurname,
        customercellphone,
        customerlocation,
        customerdestination,
        status,
      }
    ) {
      try {
        await models.Trips.create({
          customername,
          customersurname,
          customercellphone,
          customerlocation,
          customerdestination,
          status,
        });

        return "Succesfully Requested, Awaiting Driver Response";
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
module.exports = resolvers;
