const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const config = require("../../config");
const UsersService = require("../../services/usersService");
const PermissesService = require("../../services/permissesService");
const validationHandler = require("../../utils/middleware/validationHandler");

const { createUserSchema } = require("../../utils/schemas/users");

// Basic Strategy
require("../../utils/auth/strategies/basic");
require("../../utils/auth/strategies/jwt");
require("../../utils/auth/strategies/jwtTwoFactor");
require("../../utils/auth/strategies/jwtLogout");
const twoFactorAuth = require("../../utils/auth/strategies/twoFactorAuth");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  const usersService = new UsersService();

  router.post("/sign-in", async (req, res, next) => {
    passport.authenticate("basic", async (error, user) => {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        } else {
          if (user.twoFactorActive) {
            generateTempToken(req, res, next, user);
          } else {
            generateToken(req, res, next, user);
          }
        }
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
      // const checkFirstUser = await usersService.getFirstUser();
      // const checkInvitedUser = await usersService.getInvitedUserByMail(user);
      // if (!checkFirstUser && !checkInvitedUser) {
      //   console.log("llegué acá");
      // }
      try {
        const existingUser = await usersService.getUserByMail(user);
        if (existingUser) {
          res.status(200).json({
            message:
              "Este correo ya está en uso, por favor intente con otro o reestableza su contraseña",
          });
        } else {
          await usersService.createSuperAdminUser({ user });
          res.status(201).json({
            message: "User created",
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  router.post("/two-factor", async (req, res, next) => {
    passport.authenticate("jwtTwoFactor", { session: false }, (error, user) => {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        } else {
          const secret = config.twoFactorSecret;
          const { token } = req.body;
          const authorizedUser = twoFactorAuth.verify(secret, token);
          if (authorizedUser) {
            generateToken(req, res, next, user);
          } else {
            next(boom.unauthorized());
          }
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post("/send-mail-code", async (req, res, next) => {
    passport.authenticate("jwtTwoFactor", { session: false }, (error, user) => {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        } else {
          const secret = config.twoFactorSecret;
          const token = twoFactorAuth.generateTotpToken(secret);
          usersService.sendTokenToMail(user.email, token);
          return res.status(200).json({
            error: null,
            message: "Código enviado al correo",
          });
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post("/two-factor-mail", async (req, res, next) => {
    passport.authenticate("jwtTwoFactor", { session: false }, (error, user) => {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        } else {
          const { token } = req.body;
          const secret = config.twoFactorSecret;
          const authorizedUser = twoFactorAuth.verifyMailToken(secret, token);
          if (authorizedUser) {
            generateToken(req, res, next, user);
          } else {
            next(boom.unauthorized());
          }
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post("/two-factor-activate", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      const { isActive } = req.body;
      if (error || !user) {
        next(boom.unauthorized());
      } else {
        try {
          const active = await usersService.activeTwoFactorUserByID(
            isActive,
            user
          );
          if (active) {
            res
              .status(200)
              .json({ data: { message: "2FA is Activate" }, error: null });
          } else {
            res.status(500).json({ data: null, error: "Internal error" });
          }
        } catch (error) {
          next(error);
        }
      }
    })(req, res, next);
  });

  router.get("/token", async (req, res) => {
    const secret = config.twoFactorSecret;
    const token = twoFactorAuth.generateTotpToken(secret);
    res.status(200).json({
      message: token,
    });
  });

  router.post("/forgot", async (req, res, next) => {
    const email = req.body.email;
    if (email) {
      const user = await usersService.getUserByMail({ email });

      if (!user) {
        // Mejor sería next(boom.unauthorized()); para no enviar indicios del mail
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
        if (reset && accoutSetting) {
          res.status(201).json({
            message: "Link sent",
          });
        }
      }
    } else {
      next(boom.unauthorized());
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

  router.get("/logout", function (req, res, next) {
    passport.authenticate("jwt", { session: false }, (error, user) => {
      req.logOut();
      return res.redirect("/");
    })(req, res, next);
  });
}

const generateToken = (req, res, next, user) => {
  req.login(user, { session: false }, async (error) => {
    if (error) {
      next(error);
    } else {
      const permissesService = new PermissesService();
      const permissions = await permissesService.getPermissesByRol(user);
      const { userId, email, twoFactorActive, role } = user;
      const payload = {
        sub: userId,
        email,
        role,
      };
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: "24h",
      });
      return res
        .status(200)
        .json({ token, user: { userId, email, twoFactorActive, permissions } });
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
        expiresIn: "12m",
      });
      return res
        .status(200)
        .json({ token, user: { userId, email, twoFactorActive } });
    }
  });
};

module.exports = authApi;
