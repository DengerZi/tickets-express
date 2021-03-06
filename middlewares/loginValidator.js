const Joi = require('@hapi/joi');
const ResponseUtil = require('../utils/response');
const errors = require('../utils/codeInternalErrors');
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = "debug";

const loginValidator = (req, res, next) => {
  logger.info("[loginValidator] INIT");

  const data = req.body;

  const schema = Joi.object({
    "email": Joi.string().email().required(),
    "password": Joi.string().min(8).max(16).required(),
  });

  const {error} = schema.validate(data);

  logger.info("[loginValidator] FINISH");
  error ? ResponseUtil.unprocessableEntity(res, errors.VALIDATION_FAILED, errors.VALIDATION_FAILED_MESSAGE, error.details[0].message) : next();
};

module.exports = loginValidator;
