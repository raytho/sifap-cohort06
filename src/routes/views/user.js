const express = require("express");
const passport = require("passport");
const { createUserSchema } = require("../../utils/schemas/users");
const validationHandler = require("../../utils/middleware/validationHandler");

// jwt stategy
require("../../utils/auth/strategies/jwt");

const userView = (app) => {
  const router = express.Router();

  app.use("/user", router);

  router.post(
    "/sign-in",
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;
      try {
        const createdUserId = await usersService.createUser({ user });
        res.status(201).json({
          data: createdUserId,
          message: "User created",
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = userView;
