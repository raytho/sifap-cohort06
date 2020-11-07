const joi = require("@hapi/joi");

const userSchema = {
  email: joi.string().email().required(),
  firstName: joi.string().max(30).required(),
  role: joi.string().required(),
};

const inviteUserSchema = {
  ...userSchema
};

module.exports = { inviteUserSchema };
