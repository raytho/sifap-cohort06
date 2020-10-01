const joi = require("@hapi/joi");

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userSchema = {
  email: joi.string().email().required(),
  name: joi.string().max(30).required(),
  role: joi.string().valid("A", "U").required(),
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
