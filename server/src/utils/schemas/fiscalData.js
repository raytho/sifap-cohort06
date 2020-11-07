const joi = require("@hapi/joi");

const fiscalDataSchema = {
  firstName: joi.string().max(30).required(),
  lastName: joi.string().max(30).required(),
  dateOfBirth: joi.date().required(),
  country: joi.string().required(),
  company_name: joi.string().required(),
  fiscal_id: joi.string().required(),
  fiscal_identifier_name: joi.string().required(),
};

module.exports = { fiscalDataSchema };
