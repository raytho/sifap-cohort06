const express = require("express");
const passport = require("passport");
const UsersService = require("../../services/usersService");

// jwt stategy
require("../../utils/auth/strategies/jwt");
const twoFactorAuth = require("../../utils/auth/strategies/twoFactorAuth");

function userView(app) {
  const router = express.Router();
  app.use("/api/user", router);

  const usersService = new UsersService();

  router.get("/settings/send-qr", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        } else {
          twoFactorAuth.generateQr().then((qrCode) => {
            res.status(200).json({
              message: qrCode,
            });
          });
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.get("/data/user-info", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        } else {
          const userData = await usersService.getUserByMail(user);
          const twoFactorToNumber = user.twoFactorActive == 1 ? true : false;
          res.status(200).json({
            message: {
              Phone: userData.phoneNumber,
              FirstName: userData.firstName,
              LastName: userData.lastName,
              City: userData.city,
              State: userData.state,
              Country: userData.country,
              FiscalId: userData.fiscalId,
              Role: userData.role,
              FiscalAct: userData.fiscalAct,
              twoFactorActive: twoFactorToNumber,
            },
          });
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.put("/data/profile", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      const userData = req.body;
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        }
        else {
          const updateUser = await usersService.updateUserProfile(userData, user.userId);

          if (updateUser) {
            const userData = await usersService.getUserByMail(user);
            const twoFactorToNumber = user.twoFactorActive == 1 ? true : false;           
            res.status(200).json({
              data: { message: {
                phoneNumber: userData.phoneNumber,
                firstName: userData.firstName,
                city: userData.city,
                state: userData.state,
                country: userData.country,
                fiscalId: userData.fiscalId,
                FiscalAct: userData.fiscalAct,
                twoFactorActive: twoFactorToNumber,
              } },
              error: null,
            });
          } else {
            res.status(500).json({
              message: "Todo mal",
            });
          }
        }
        
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });
}

module.exports = userView;
