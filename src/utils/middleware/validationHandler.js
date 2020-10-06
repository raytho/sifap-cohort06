const boom = require("@hapi/boom");
const joi = require("@hapi/joi");

function validate(data, schema) {
  const joiSchema = joi.object(schema);
  const { error } = joiSchema.validate(data);
  return error;
}

function validationHandler(schema, check = "body") {
  return function (req, res, next) {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
