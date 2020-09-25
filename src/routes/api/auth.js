const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");

// const ApiKeysService = require("../../services/apiKeys");
const config = require("../../config");
const UsersService = require("../../services/users");
const validationHandler = require("../../utils/middleware/validationHandler");

const { createUserSchema } = require("../../utils/schemas/users");

// Basic Strategy
require("../../utils/auth/strategies/basic");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  const usersService = new UsersService();

  router.post("/sign-in", async (req, res, next) => {
    passport.authenticate("basic", (error, user) => {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        req.login(user, { session: false }, async (error) => {
          if (error) {
            next(error);
          } else {
            const { _id: id, name, email } = user;
            const payload = {
              sub: id,
              name,
              email,
            };
            const token = jwt.sign(payload, config.authJwtSecret, {
              expiresIn: "15m",
            });
            return res.status(200).json({ token, user: { id, name, email } });
          }
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post(
    "/sign-up",
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

  router.post("/forgot", (req, res) => {
    const userName = req.body.email;
    if (userName) {
      const id = usersService.getUser(userName);
      const request = {
        id,
        email: userName.email,
      };
      const reset = usersService.sendResetLink(request.email, request.id);
      if (reset) {
        res.status(201).json({
          message: "Link sent",
        });
      }
    }
  });
}

module.exports = authApi;
