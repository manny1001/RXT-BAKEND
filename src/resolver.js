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
          `  ${process.env.JWT_SECRET_KEY}`,
          { expiresIn: "150000" }
        );
        return {
          token,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async OTPVerify(_, { otp }) {
      try {
        const user = await models.User.findOne({
          where: { otp },
          order: [["createdAt", "DESC"]],
        });

        if (!user) {
          throw new Error("Incorrect  OTP");
        }
        /* const userOTP = await models.User.findOne({ where: { otp } });

        if (!userOTP) {
          throw new Error("Incorrect OTP");
        } */
        /*  jsonwebtoken.verify(token, `${process.env.JWT_SECRET_KEY}`, function(err, decoded) {
          console.log(decoded.foo) // bar
        }); */
        return {
          user,
          message: "Authenticated!",
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
module.exports = resolvers;
/* async registerUser(root, { username, acceptedtcs, cellphone, password }) {
      try {
        const user = await models.User.create({
          username,
          cellphone,
          password: await bcrypt.hash(password, 10),
          acceptedtcs,
        });
        const token = jsonwebtoken.sign(
          { id: user.id, cellphone: user.cellphone },
          `  ${process.env.JWT_SECRET_KEY}`,
          { expiresIn: "1y" }
        );
        return {
          token,
          message: "Succesfull",
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }, */
