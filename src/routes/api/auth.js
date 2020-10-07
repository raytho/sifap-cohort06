const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// const ApiKeysService = require("../../services/apiKeys");
const config = require("../../config");
const UsersService = require("../../services/usersService");
const validationHandler = require("../../utils/middleware/validationHandler");

const { createUserSchema } = require("../../utils/schemas/users");

// Basic Strategy
require("../../utils/auth/strategies/basic");
require("../../utils/auth/strategies/jwtTwoFactor");
const twoFactorAuth = require("../../utils/auth/strategies/twoFactorAuth");
const { response } = require("express");

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
        generateToken(req, res, next, { userId, email });
      } else {
        next(boom.unauthorized());
      }
    }
  );

  router.post("/forgot", async (req, res, next) => {
    const email = req.body.email;
    if (email) {
      const user = await usersService.getUserByMail({ email });

      if (!user) {
        res.status(404).json({
          error: "No account with that email address exists.",
          data: null,
        });
      } else {
        const token = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 900000;

        const account = {
          email: user.email,
          token: user.resetPasswordToken,
          expires: user.resetPasswordExpires,
          dateRegister: new Date().toLocaleString(),
          host: req.headers.host,
        };

        const reset = usersService.sendResetLink(account);
        delete account.host;
        const accoutSetting = await usersService.createAccoutSetting(account);
        if (accoutSetting) {
          res.status(201).json({
            message: "Link sent",
          });
        }
      }
    } else {
      response.status(200);
    }
  });

  router.get("/forgot/:token", async (req, res, next) => {
    const { token } = req.params;
    if (!token) {
      next(boom.unauthorized());
    } else {
      const minutes = 1000 * 60;
      const validateUser = await usersService.getUserBytoken(token);
      const fechaToken = validateUser.expires / minutes;
      const diferencia = Math.round(fechaToken - Date.now() / minutes);

      if (diferencia <= 0) {
        res.status(200).json({
          data: null,
          error: "Expired token",
        });
      } else {
        if (!validateUser) {
          res.status(500).json({
            data: null,
            error: "Internal error",
          });
        } else {
          delete validateUser.id;
          delete validateUser.token;
          delete validateUser.expires;
          delete validateUser.dateRegister;

          res.status(200).json({
            data: validateUser,
            error: null,
          });
        }
      }
    }
  });

  router.put("/password/:id", async (req, res) => {
    const id = req.params.id;
    const newPassword = req.body.password;
    if (!newPassword) {
      res.status(400).json({
        message: "Bad request",
        error: "Bad request",
      });
    } else {
      try {
        const updatedUser = await usersService.updatePasswordUserByID(
          id,
          newPassword
        );
        if (updatedUser) {
          res.status(200).send({
            data: updatedUser.message,
            message: "User updated",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error to get user" });
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
      const payload = {
        sub: userId,
        email,
      };
      const token = jwt.sign(payload, config.authTwoFactorJwtSecret, {
        expiresIn: "5m",
      });
      return res
        .status(200)
        .json({ token, user: { userId, email, twoFactorActive } });
    }
  });
};

module.exports = authApi;
