const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");

// const ApiKeysService = require("../../services/apiKeys");
const config = require("../../config");
const UsersService = require("../../services/usersService");
const validationHandler = require("../../utils/middleware/validationHandler");

const { createUserSchema } = require("../../utils/schemas/users");

// Basic Strategy
require("../../utils/auth/strategies/basic");
require("../../utils/auth/strategies/jwtTwoFactor");
const twoFactorAuth = require("../../utils/auth/strategies/twoFactorAuth");

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
        
        if (user.twoFactorActive) {
          generateTempToken(req, res, next, user);
        } else {
          generateToken(req, res, next, user);
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
        await usersService.createSuperAdminUser({ user });
        res.status(201).json({
          message: "User created",
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/two-factor",
    passport.authenticate("jwtTwoFactor", { session: false }),
    async (req, res) => {
      res.status(200).send({
        data: "test",
      });
    }
  );

  router.post(
    "/two-factor",
    passport.authenticate("jwtTwoFactor", { session: false }),
    async (req, res, next) => {
      const { token, userId, email } = req.body;
      const secret = config.twoFactorSecret;
      const authorizedUser = twoFactorAuth.verify(secret, token);
      if (authorizedUser) {
        generateToken(req, res, next, {userId, email});
      } else {
        next(boom.unauthorized());
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

const generateToken = (req, res, next, user) => {
  req.login(user, { session: false }, async (error) => {
    if (error) {
      next(error);
    } else {
      const { userId, email } = user;
      const payload = {
        sub: userId,
        email,
      };
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: "15m",
      });
      return res.status(200).json({ token, user: { userId, email } });
    }
  });
};

const generateTempToken = (req, res, next, user) => {
  req.login(user, { session: false }, async (error) => {
    if (error) {
      next(error);
    } else {
      const { userId, email, twoFactorActive } = user;
      console.log(user);
      const payload = {
        sub: userId,
        email,
      };
      const token = jwt.sign(payload, config.authTwoFactorJwtSecret, {
        expiresIn: "5m",
      });
      return res.status(200).json({ token, user: {userId, email, twoFactorActive } });
    }
  });
};

module.exports = authApi;
