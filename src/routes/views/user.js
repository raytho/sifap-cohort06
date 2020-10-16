const express = require("express");
const passport = require("passport");

// jwt stategy
require("../../utils/auth/strategies/jwt");
const twoFactorAuth = require("../../utils/auth/strategies/twoFactorAuth");

function userView(app) {
  const router = express.Router();
  app.use("/api/user", router);

  router.get("/settings/send-qr", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, user) => {
      try {
        if (error || !user) {
          res.status(500).json({
            message: "No autorizado",
          });
        } else {
          twoFactorAuth.generateQr()
            .then( qrCode => {
              res.status(200).json({
                message: qrCode,
              });
            });
        }
      } catch (error) {
        //
      }
    })(req, res, next);
  });
}

module.exports = userView;
