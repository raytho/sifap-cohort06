const joi = require("@hapi/joi");

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userSchema = {
  firstName: joi.string().required().required(),
  fiscaId: joi.string().required().required(),
  email: joi.string().email().required(),
  password: joi.string().required().required(),
  country: joi.string().max(255).required(),
};

const createUserSchema = {
  ...userSchema,
  isAdmin: joi.boolean(),
};

const createProviderUserSchema = {
  ...userSchema,
  apiKeyToken: joi.string().required(),
};

module.exports = {
  userIdSchema,
  createUserSchema,
  createProviderUserSchema,
};
