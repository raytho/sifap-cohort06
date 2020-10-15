// TOKEN Validation
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");
const UsersService = require("../../../services/usersService");
const config = require("../../../config");

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      const userService = new UsersService();

      try {
        const user = await userService.getUserByMail({
          email: tokenPayload.email,
        });
        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;

        cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (error) {
        return cb(error);
      }
    }
  )
);
