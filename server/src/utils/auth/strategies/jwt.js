// TOKEN Validation
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");
const UsersService = require("../../../services/usersService");
const PermissesService = require("../../../services/permissesService");
const config = require("../../../config");

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      const userService = new UsersService();
      const permissesService = new PermissesService();

      try {
        const user = await userService.getUserByMail({
          email: tokenPayload.email,
        });
        const permissions = await permissesService.getPermissesByRol(user);
        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;

        cb(null, { ...user, scopes: permissions });
      } catch (error) {
        return cb(error);
      }
    }
  )
);
