const joi = require("@hapi/joi");

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const userSchema = {
  email: joi.string().email().required(),
  password: joi.string().required().required(),
  phoneNumber: joi.string().max(24).required(),
  firstName: joi.string().max(15).required(),
  lastName: joi.string().max(15).required(),
  dateOfBirth: joi.date().required(),
  city: joi.string().max(255).required(),
  state: joi.string().max(255).required(),
  country: joi.string().max(255).required(),
  taxReceiptLimit: joi.number().required(),
  fiscalId: joi.string().max(255).required(),
  createdAt: joi.date().required(),
  role: joi.string().valid("SA", "A", "U").required(),
  fiscalAct: joi.string().valid("PM", "PF", "ONG").required(),
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
