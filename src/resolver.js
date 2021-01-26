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
    async allDriver(root, args, { user }) {
      try {
        if (!user) throw new Error("You are not authenticated!");
        return models.Driver.findAll();
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
          { expiresIn: "1d" }
        );
        return {
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async updateProfile(
      _,
      { id, username, email, cellphone, homeaddress, workaddress }
    ) {
      try {
        await models.User.update(
          {
            id,
            username,
            email,
            cellphone,
            homeaddress,
            workaddress,
          },
          { where: { id: id } }
        );
        return "Success";
      } catch {
        (err) => console.log(err);
      }
    },
    async newTripRequest(
      root,
      { username, cellphone, location, destination, paymentmethod }
    ) {
      try {
        await models.Trips.create({
          username,
          cellphone,
          location,
          destination,
          paymentmethod,
          status: "Pending Driver",
        });

        return "Succesfully Requested, Awaiting Driver Response";
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
module.exports = resolvers;
