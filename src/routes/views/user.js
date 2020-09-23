const express = require("express");
const passport = require("passport");

// jwt stategy
require("../../utils/auth/strategies/jwt");

const userView = (app) => {
  const router = express.Router();

  app.use("/user", router);

  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.send("Hello User");
    }
  );
};

module.exports = userView;
